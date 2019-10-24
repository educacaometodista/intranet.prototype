import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer
} from "mdbreact";
// Hero Carousel: https://mdbootstrap.com/docs/react/advanced/carousel

import ScrollMenu from "react-horizontal-scrolling-menu";
import PropTypes from "prop-types";

import HomeNews from "../../../components/intranet/homeNews";

import "./home.css";

////////////////////////////////////// END OF IMPORTS //////////////////////////////////////

const loremimg =
  "https://image.shutterstock.com/image-photo/popular-photographers-attraction-braies-lake-600w-705417145.jpg";

const list = [
  { name: "item1" },
  { name: "item2______________" },
  { name: "item3" },
  { name: "item4" },
  { name: "item5" },
  { name: "item6" },
  { name: "item7______________" },
  { name: "item8" },
  { name: "item9" },
  { name: "item10" },
  { name: "item11" },
  { name: "item12" },
  { name: "item13" },
  { name: "item14______________" },
  { name: "item15" },
  { name: "item16" },
  { name: "item17" },
  { name: "item18" },
  { name: "item19" },
  { name: "item20" },
  { name: "item21" },
  { name: "item22______________" },
  { name: "item23" },
  { name: "item24" },
  { name: "item25" }
];

const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

export const Menu = (list, selected) =>
  list.map(el => {
    const { name } = el;
    const onClick = () => console.log("original onClick ", name);
    return (
      <MenuItem text={name} key={name} selected={selected} onClick={onClick} />
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

export default class Home extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: list.length,
    selected: "item1",
    scrollToSelected: false,
    translate: undefined,
    transition: 0.4,
    wheel: true,
    showList: true,
    inertiascrolling: false,
    slowdownFactor: 0.25
  };

  constructor(props) {
    super(props);
    this.menu = null;
    this.menuItems = Menu(list.slice(0, list.length), this.state.selected);
  }

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew && this.menu) {
      this.menu.setInitial();
      this.menu.forceUpdate();
      this.forceUpdate();
    }
  }

  onUpdate = ({ translate }) => {
    console.log(
      // `onUpdate: translate: ${translate} firstItemVisible: ${firstItemVisible}, lastItemVisible: ${lastItemVisible}`
      `onUpdate: translate: ${translate}`
    );
    this.setState({ translate });
  };

  onSelect = key => {
    console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
  };

  setItemsCount = ev => {
    const { itemsCount = list.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= list.length && val >= 0
        ? +ev.target.value
        : list.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(list.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew
      });
    }
  };

  setSlowdownFactor = ev => {
    this.setState({ slowdownFactor: ev.target.value });
  };

  setSelected = ev => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };

  toggle = () => {
    this.setState({ showList: !this.state.showList });
  };

  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      selected,
      translate,
      transition,
      wheel,
      showList,
      scrollToSelected,
      inertiascrolling,
      slowdownFactor
    } = this.state;

    const menu = this.menuItems;

    return (
      <Fragment>
        <MDBContainer fluid={true}>
          <MDBCarousel
            activeItem={1}
            length={3}
            showControls={false}
            showIndicators={true}
            className="z-depth-1"
          >
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <MDBView className="carouselView">
                  <img
                    className="d-block w-100"
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                    alt="First slide"
                  />
                  <MDBMask overlay="black-light" />
                </MDBView>
                <MDBCarouselCaption>
                  <h3 className="h3-responsive">Light mask</h3>
                  <p>First text</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <MDBView className="carouselView">
                  <img
                    className="d-block w-100"
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
                    alt="Second slide"
                  />
                  <MDBMask overlay="black-strong" />
                </MDBView>
                <MDBCarouselCaption>
                  <h3 className="h3-responsive">Strong mask</h3>
                  <p>Second text</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView className="carouselView">
                  <img
                    className="d-block w-100"
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg"
                    alt="Third slide"
                  />
                  <MDBMask overlay="black-slight" />
                </MDBView>
                <MDBCarouselCaption>
                  <h3 className="h3-responsive">Slight Mast</h3>
                  <p>Third text</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
        </MDBContainer>

        <Row className="mt-5 text-center">
          <Colxx xxs="12" className="mb-4">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
            <p className="text-muted">
              Magni laborum quaerat assumenda, ipsa atque minus aliquam,
              adipisci ab vel asperiores aspernatur at obcaecati facere
              consequuntur voluptate quae saepe et soluta.
            </p>
          </Colxx>
        </Row>

        <Row className="mt-2 text-left">
          <Colxx xxs="12" className="mb-4">
            <HomeNews
              src={loremimg}
              title={
                "Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet"
              }
            />
            <HomeNews
              src={loremimg}
              title={
                "Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet"
              }
            />
            <HomeNews
              src={loremimg}
              title={
                "Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet"
              }
            />
            <HomeNews src={loremimg} title={"Lorem ipsum dolor sit amet"} />
            <HomeNews src={loremimg} title={"Lorem ipsum dolor sit amet"} />
            <HomeNews src={loremimg} title={"Lorem ipsum dolor sit amet"} />
            <HomeNews src={loremimg} title={"Lorem ipsum dolor sit amet"} />
            <HomeNews src={loremimg} title={"Lorem ipsum dolor sit amet"} />
            <HomeNews src={loremimg} title={"Lorem ipsum dolor sit amet"} />
            <HomeNews src={loremimg} title={"Lorem ipsum dolor sit amet"} />
          </Colxx>
        </Row>

        <Row className="mt-2">
          <Colxx xxs="12">
            {showList && (
              <ScrollMenu
                ref={el => (this.menu = el)}
                data={menu}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                hideArrows={hideArrows}
                hideSingleArrow={!hideSingleArrow}
                transition={+transition}
                onUpdate={this.onUpdate}
                onSelect={this.onSelect}
                scrollToSelected={scrollToSelected}
                selected={selected}
                scrollBy={0}
                translate={translate}
                alignCenter={alignCenter}
                dragging={dragging}
                clickWhenDrag={clickWhenDrag}
                wheel={wheel}
                inertiaScrolling={inertiascrolling}
                inertiaScrollingSlowdown={slowdownFactor}
                rtl={false}
              />
            )}

            {/* <form className="properties">
              <label style={checkboxStyle}>
                Align center
                <input
                  name="alignCenter"
                  type="checkbox"
                  checked={alignCenter}
                  onChange={() => this.setState({ alignCenter: !alignCenter })}
                />
              </label>
              <label style={checkboxStyle}>
                Dragging
                <input
                  name="dragging"
                  type="checkbox"
                  checked={dragging}
                  onChange={() => this.setState({ dragging: !dragging })}
                />
              </label>
              <label style={checkboxStyle}>
                Click when drag end
                <input
                  name="clickWhenDrag"
                  type="checkbox"
                  checked={clickWhenDrag}
                  onChange={() =>
                    this.setState({ clickWhenDrag: !clickWhenDrag })
                  }
                />
              </label>
              <label style={checkboxStyle}>
                Scroll to selected item
                <input
                  name="scrollToSelected"
                  type="checkbox"
                  checked={scrollToSelected}
                  onChange={() =>
                    this.setState({ scrollToSelected: !scrollToSelected })
                  }
                />
              </label>
              <label style={checkboxStyle}>
                Use mouse wheel
                <input
                  name="wheel"
                  type="checkbox"
                  checked={wheel}
                  onChange={() => this.setState({ wheel: !wheel })}
                />
              </label>
              <label style={checkboxStyle}>
                Hide arrows if items width less than menu width
                <input
                  name="hideArrows"
                  type="checkbox"
                  checked={hideArrows}
                  onChange={() => this.setState({ hideArrows: !hideArrows })}
                />
              </label>
              <label style={checkboxStyle}>
                Hide left/right arrows if first/last item visible
                <input
                  name="hideSingleArrow"
                  type="checkbox"
                  checked={hideSingleArrow}
                  onChange={() =>
                    this.setState({ hideSingleArrow: !hideSingleArrow })
                  }
                />
              </label>
              <br />
              <div style={valueStyle}>
                Translate: {(translate || 0).toFixed(2)}
              </div>
              <label style={valueStyle}>
                Selected:
                <input
                  style={{ margin: "0 5px" }}
                  name="selected"
                  type="text"
                  value={selected}
                  onChange={this.setSelected}
                />
              </label>
              <label style={valueStyle}>
                Transition duration:
                <input
                  style={{ margin: "0 5px" }}
                  name="transition"
                  type="number"
                  value={transition || 0}
                  min={0}
                  max={10}
                  onChange={ev =>
                    this.setState({
                      transition: !isNaN(+ev.target.value)
                        ? +ev.target.value
                        : 0
                    })
                  }
                />
              </label>
              <label style={valueStyle}>
                Items count:
                <input
                  style={{ margin: "0 5px" }}
                  name="itemsCount"
                  type="number"
                  value={itemsCount}
                  min={0}
                  max={list.length}
                  onChange={this.setItemsCount}
                />
              </label>
              <label style={checkboxStyle}>
                Inertia Scrolling
                <input
                  name="inertiascrolling"
                  type="checkbox"
                  checked={inertiascrolling}
                  onChange={() =>
                    this.setState({ inertiascrolling: !inertiascrolling })
                  }
                />
              </label>
              <label style={valueStyle}>
                Inertia scrolling slowdown:
                <input
                  style={{ margin: "0 5px" }}
                  name="slowdownFactor"
                  type="number"
                  value={slowdownFactor}
                  onChange={this.setSlowdownFactor}
                />
              </label>
            </form> */}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
