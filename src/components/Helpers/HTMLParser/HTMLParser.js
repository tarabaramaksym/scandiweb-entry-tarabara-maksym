import React from 'react';

const HTMLParser = props => {

  const parse = () => {
    const parsed = new DOMParser().parseFromString(`<div>${props.htmlString}</div>`, 'text/xml');
    return createElement(parsed.children[0]);
  }

  let key = 0;
  const createElement = (element) => {
    let children = [];
    if (element.children.length > 0) {
      [...element.children].forEach(child => {
        children.push(createElement(child));
      });

    }
    else {
      children = element.innerHTML;
    }
    return React.createElement(element.tagName, { key: key++ }, children)
  }

  return (
    <div className={props.className}>
      {parse()}
    </div>
  );
}

export default HTMLParser;