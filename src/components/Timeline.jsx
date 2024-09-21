import React, { useState } from 'react';
import pkg from 'react-collapse';
const { Collapse } = pkg;

const Accordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {sections.map((section, index) => (
        <div key={index} className="accordion-section">
          <div className="accordion-header" onClick={() => handleToggle(index)}>
            <span className="accordion-pill">{section.year}</span>
            <span className="accordion-title">{section.title}</span>
          </div>
          <Collapse isOpened={activeIndex === index}>
            <div className="accordion-content">{section.content}</div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default Accordion;