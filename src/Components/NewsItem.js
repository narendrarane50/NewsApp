import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default class NewsItem extends Component {
  // constructor(){
  //   super()
  //   // console.log("Hello")
  // }
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <Card className="my-3">
        <Card.Img
          variant="top"
          src={
            !imageUrl
              ? "https://images.moneycontrol.com/static-mcnews/2022/11/market-data-770x433.jpg"
              : imageUrl ===
                "https://i-invdn-com.investing.com/news/https://i-invdn-com.investing.com/akapi-images/800x450/91d857f8bfcaee41b90d4c1d0259c39d_w_800_h_450.jpg"
              ? "https://images.moneycontrol.com/static-mcnews/2022/11/market-data-770x433.jpg"
              : imageUrl
          }
        />
        <Card.Body>
          <Card.Title>{title}...</Card.Title>
          <Card.Text>{description}...</Card.Text>

          <Button
            href={newsUrl}
            target="_blank"
            className="btn-sm"
            variant="dark"
          >
            Read more
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            By {!author ? "unknown" : author} on {new Date(date).toGMTString()}
          </small>
        </Card.Footer>
      </Card>
    );
  }
}
