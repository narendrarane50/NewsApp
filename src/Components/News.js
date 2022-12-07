import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Button from 'react-bootstrap/Button';
import Spinner from './Spinner';
//import Stack from 'react-bootstrap/Stack';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:15,
    category:'general'
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  
  constructor(props){
    super(props)
    this.state={
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewMonkey`
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(pageNo){
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    await fetch(url).then((res) => res.json())
    .then((json1) => {
        this.setState({
            articles: json1.articles,
            loading: false,
            totalResults:json1.totalResults
        });
    });
    this.props.setProgress(100)
  }
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ddff45f88064d80bb6c0ae30199689e&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // await fetch(url).then((res) => res.json())
    // .then((json1) => {
    //     this.setState({
    //         articles: json1.articles,
    //         loading: false,
    //         totalResult:json1.totalResults
    //     });
    // });
    this.updateNews()
    
  }

  handlePrevClick=async ()=>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ddff45f88064d80bb6c0ae30199689e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // await fetch(url).then((res) => res.json())
    // .then((json1) => {
    //     this.setState({
    //         articles: json1.articles,
    //         loading: false,
    //         page:this.state.page-1
    //     });
    // });

    await this.setState({
      page:this.state.page-1
    })
    this.updateNews()
  }
  async handleNextClick(){
  //   if(!(this.state.page+1>Math.ceil(this.state.totalResult/this.props.pageSize))){
    
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ddff45f88064d80bb6c0ae30199689e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   await fetch(url).then((res) => res.json())
  //   .then((json1) => {
  //       this.setState({
  //           articles: json1.articles,
  //           loading: false,
  //           page:this.state.page+1
  //       });
  //   });
  // }
  await this.setState({
    page:this.state.page+1
  })
  this.updateNews()
  }

  fetchMoreData =async () => {
    this.setState({page:this.state.page+1})
    setTimeout(async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true})
    await fetch(url).then((res) => res.json())
    .then((json1) => {
        this.setState({
            articles: this.state.articles.concat(json1.articles),
            totalResults:json1.totalResults,
            
        });
    });
    }, 1500);
  };

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,60):""} description={element.description?element.description.slice(0,88):""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        
        <Button disabled={this.state.page===1} variant="dark" onClick={this.handlePrevClick}>&larr; Prev</Button>
        <Button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} variant="dark" onClick={this.handleNextClick}>Next &rarr;</Button>
        
        
        </div> */}
      </div>
    )
  }
}
