import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import BannerLeaf from "../../comonents/Svg/BannerLeaf";
import SmallTree from "../../assets/images/monstera-small.webp";

import {
  handlePathAnimation,
  handleScaleAnimation,
} from "../../utils/animation";

import "./home.css";
import TextMorph from "../../comonents/TextMorph/TextMorph";

const Home = () => {
  const { ref: svgWrapperRef, inView: svgInView } = useInView({
    threshold: 0,
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolledUp, setIsScrolledUp] = useState(null);
  const [scaleTimeoutId, setScaleTimeoutId] = useState(null);
  const [pathTimeoutId, setPathTimeoutId] = useState(null);
  const [scaleStart, setScaleStart] = useState(false);
  const [translateFact, setTranslateFact] = useState();
  const [textFact, setText] = useState();
  const svgRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (!svgInView) return;

      handlePathAnimation(svgRef, isScrolledUp, scrollPosition);
      handleScaleAnimation(
        svgRef,
        isScrolledUp,
        scaleTimeoutId,
        setScaleTimeoutId,
        pathTimeoutId,
        setPathTimeoutId,
        scrollPosition,
        scaleStart,
        setScaleStart
      );

      setTimeout(() => {
        setTranslateFact(scrollPosition / 1000);
        setText(scrollPosition / 5);
      }, 1000);
    };

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollPosition, isScrolledUp, scaleTimeoutId]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollPosition(currentScrollPos);
      setIsScrolledUp(scrollPosition > currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, isScrolledUp]);

  return (
    <div id="scrollContainer">
      <div className="hero-section">
        <BannerLeaf svgRef={svgRef} />
        <div className="leaf-text" ref={svgWrapperRef}>
          <img
            src={SmallTree}
            alt=""
            className="small-leaf"
            style={{
              transform: `translate3d(-${translateFact * 65}%, -${
                translateFact * 80
              }%, 0px) scale(${translateFact + 1}, ${translateFact + 1})`,
            }}
          />

          <div className="text">
            <h1 className="top-heading">Return to</h1>
            <TextMorph
              transform={`translate3d(-${textFact + 100}%, 0px, 0px)`}
            />
            <p
              className="top-desc"
              style={{
                transform: `translate3d(-${textFact + 20}%, 0px, 0px)`,
              }}
            >
              Welcome to a tranquil sanctuary, where healing dances with nature,
              <br />
              community radiates warmth, and minds evolve endlessly.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden-section"></div>

      <div className="other-section">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          perspiciatis libero odit ducimus quibusdam laboriosam amet dignissimos
          ad nesciunt tempora aliquam nisi facilis totam cum eveniet numquam
          magnam iste dolorem, nobis minus modi accusantium? Corporis sunt nemo
          a voluptate hic, eos dolorum optio itaque odio quod possimus
          repudiandae quisquam fugiat quidem esse veniam inventore nam. Minus
          quis quasi suscipit aspernatur ullam modi consectetur unde. Adipisci
          similique ullam iusto, numquam dicta saepe totam rem maiores,
          consectetur iure voluptatum ex dolore, eveniet asperiores. Est,
          provident tenetur. A facilis, officiis delectus dolor, doloremque
          accusantium obcaecati veritatis voluptatibus iusto possimus ducimus,
          odit cum consequatur nam vero porro deserunt non fugit eveniet rerum
          distinctio rem architecto. Illum consequuntur placeat non laborum
          maxime! Neque recusandae sint dolores sed porro. Dolorem, incidunt!
          Magnam ex dolorem nesciunt voluptates aspernatur consequatur error
          quos nisi facere, autem magni eius tempora corrupti, neque nam. Vero
          voluptates blanditiis veniam aut dolorum mollitia sapiente iusto unde,
          quas quis rem perspiciatis est et, quasi inventore ex hic illo
          consectetur. Nesciunt cupiditate repudiandae vero autem. Obcaecati
          eaque quae natus quo iste odio laborum porro molestiae asperiores,
          ipsum distinctio error doloribus laboriosam cumque vero voluptates
          nemo dolorum est? Sit omnis animi nam, obcaecati esse possimus ratione
          numquam nesciunt id ullam provident ab iure harum dolorem magnam
          voluptate voluptas totam! Harum suscipit dolores ab reprehenderit
          tempora corporis sit, iure illo. Adipisci, ab quos cum cupiditate, non
          saepe qui minima expedita nulla natus atque molestiae eveniet modi,
          provident rem fuga? Delectus similique aut vero. Explicabo labore
          rerum possimus?
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium
          fugiat provident consectetur expedita officiis facilis, alias,
          sapiente totam et laborum officia commodi autem molestias dolorum
          minus vitae perferendis voluptates ad vero, amet dolor eos corporis.
          Dolorem labore perspiciatis odit. Voluptate nostrum, possimus
          asperiores iste assumenda corrupti alias nisi, unde, laudantium
          voluptatum mollitia. Pariatur voluptatem facilis labore veritatis
          assumenda atque quibusdam ea ratione laboriosam quia, dicta enim
          recusandae, nihil adipisci repudiandae vero dolores praesentium? Ad
          officia cum reiciendis esse saepe id voluptates blanditiis. Delectus
          excepturi eum illo optio porro velit numquam ducimus distinctio!
          Repellat nam maiores iusto nobis quisquam, libero eligendi.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium
          fugiat provident consectetur expedita officiis facilis, alias,
          sapiente totam et laborum officia commodi autem molestias dolorum
          minus vitae perferendis voluptates ad vero, amet dolor eos corporis.
          Dolorem labore perspiciatis odit. Voluptate nostrum, possimus
          asperiores iste assumenda corrupti alias nisi, unde, laudantium
          voluptatum mollitia. Pariatur voluptatem facilis labore veritatis
          assumenda atque quibusdam ea ratione laboriosam quia, dicta enim
          recusandae, nihil adipisci repudiandae vero dolores praesentium? Ad
          officia cum reiciendis esse saepe id voluptates blanditiis. Delectus
          excepturi eum illo optio porro velit numquam ducimus distinctio!
          Repellat nam maiores iusto nobis quisquam, libero eligendi.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium
          fugiat provident consectetur expedita officiis facilis, alias,
          sapiente totam et laborum officia commodi autem molestias dolorum
          minus vitae perferendis voluptates ad vero, amet dolor eos corporis.
          Dolorem labore perspiciatis odit. Voluptate nostrum, possimus
          asperiores iste assumenda corrupti alias nisi, unde, laudantium
          voluptatum mollitia. Pariatur voluptatem facilis labore veritatis
          assumenda atque quibusdam ea ratione laboriosam quia, dicta enim
          recusandae, nihil adipisci repudiandae vero dolores praesentium? Ad
          officia cum reiciendis esse saepe id voluptates blanditiis. Delectus
          excepturi eum illo optio porro velit numquam ducimus distinctio!
          Repellat nam maiores iusto nobis quisquam, libero eligendi.
        </p>
      </div>
    </div>
  );
};

export default Home;

// mid
// translate3d(-8.4188%, -10.3616%, 0px) scale(1.1295, 1.1295)
//translate3d(-23.2762%, -28.6477%, 0px) scale(1.3581, 1.3581)
//translate3d(-38.1332%, -46.9331%, 0px) scale(1.5867, 1.5867)
//translate3d(-52.9906%, -65.2192%, 0px) scale(1.8152, 1.8152)
//translate(-65%, -80%) scale(2, 2)

///////////////
//translate3d(-2.6231%, 0px, 0px)
//translate3d(-9.4981%, 0px, 0px)
//translate3d(-19.428%, 0px, 0px)

////////////////////

//translate3d(-36.5551%, 0px, 0px)
//translate3d(-26.2604%, 0px, 0px)
//translate3d(-53.7144%, 0px, 0px)

////////////////////////
//translate3d(-96.8545%, 0px, 0px)
//translate3d(-43.022%, 0px, 0px)
//translate3d(-43.022%, 0px, 0px)

////////
//translate(-105%, 0px)
//translate(-110%, 0px)
//translate(-150%, 0px)
