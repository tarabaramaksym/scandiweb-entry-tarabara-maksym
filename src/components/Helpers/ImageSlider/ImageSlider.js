import { Component } from "react";

import arrowIcon from '../../../icons/caret-white.svg';
import './ImageSlider.css'

class ImageSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0
    }

    this.prevImage = this.prevImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  prevImage() {
    this.setState({ ...this.state, selectedImage: this.state.selectedImage === 0 ? this.props.images.length - 1 : this.state.selectedImage - 1 })
  }

  nextImage() {
    this.setState({ ...this.state, selectedImage: (this.state.selectedImage + 1) % (this.props.images.length - 1) })
  }

  render() {
    return (
      <div className="image-slider">
        <img className={this.props.className} src={this.props.images[this.state.selectedImage]}></img>
        {
          this.props.images.length > 1 ?
            <div className="arrow-buttons">
              <button onClick={this.prevImage}><img src={arrowIcon}></img></button>
              <button onClick={this.nextImage}><img src={arrowIcon}></img></button>
            </div>
            : null
        }
      </div >
    );
  }

}

export default ImageSlider;