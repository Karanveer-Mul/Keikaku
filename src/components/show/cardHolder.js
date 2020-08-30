import React, { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import ShowSummary from "./showSummary";
//import { getSeries } from "../../actions/";

const CardHolder = (props) => {
  /*useEffect(() => {
    getSeries();
  });*/

  const { title, type, score, image_url } = props.show;

  const [isSummaryShown, setSummaryShown] = useState(false);

  return (
    <>
      <Card className="text-white mt-2 border-0 col-xs-8 col-sm-8 col-md-4 col-lg-2 showImage rounded-0"> 
          <Card.Img variant="top img-fluid showImage" src={image_url} />
          <Card.ImgOverlay
            className="overlay-image"
            onClick={() => setSummaryShown(true)}
          >
          <div className="badges">
            <Badge variant="primary">{type}</Badge>
            <Badge variant="warning">{score}</Badge>
          </div>
            <Card.Text className="mt-auto  showTitle">
              {title}
            </Card.Text>
          </Card.ImgOverlay>
      </Card>
      <ShowSummary
        show={isSummaryShown}
        onHide={() => setSummaryShown(false)}
        showInfo={props.show}
      />
    </>
  );
};
export default CardHolder;