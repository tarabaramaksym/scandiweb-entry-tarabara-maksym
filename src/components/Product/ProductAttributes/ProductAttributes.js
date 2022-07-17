import { Component } from "react";


class ProductAttributes extends Component {

  // recieves product and renders it's attributes, used in the shopping cart and on the product page
  render() {
    return (
      <div className="product-attributes">
        {this.props.product.attributes.map((a, index) => {
          const swatch = a.type === 'swatch';
          return (
            <div key={a.id} className="product-attribute">
              <h6 className="product-label uppercase-title">{a.name}:</h6>
              <div className="attribute-items">
                {a.items.map((item, itemIndex) => {
                  const isSelected = itemIndex === this.props.selectedAttributes[index];
                  return swatch ?
                    (
                      <div key={itemIndex} className={`attribute-swatch-border ${isSelected ? 'selected-attribute-swatch' : ''}`} >
                        <button
                          key={itemIndex}
                          className={`btn-attribute-swatch`}
                          style={{ backgroundColor: item.value }}
                          onClick={!isSelected ? () => { this.props.attributeClickHandler(index, itemIndex) } : null}
                        >
                        </button>
                      </div>
                    )
                    :
                    (<button key={itemIndex} className={`btn-attribute ${isSelected ? 'selected-attribute' : ''}`}
                      onClick={!isSelected ? () => { this.props.attributeClickHandler(index, itemIndex) } : null}
                    >
                      {item.value}
                    </button>)
                })}
              </div>
            </div>
          )
        })
        }

      </div >);

  }
}

export default ProductAttributes;