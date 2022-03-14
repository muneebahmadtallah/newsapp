import React, { Component } from 'react';
import Loading from './Loading';
import NewsItems from './NewsItems';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
      static defaultProps = {
        country : 'us',
        pageSize : 20,
        category : 'general'

      }  
      static propTypes ={
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category : PropTypes.string
      }
      
       capitalizeFirstLetter =(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  constructor(props){
      super(props);
      this.state={
        articles:[],
        loading: false,
        page:1,
        totalResults :0
      }
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }
    
  async update (){
     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});  
      let data = await fetch(url);
      let parseData = await data.json()
    //   console.log(parseData);
      this.setState({articles: parseData.articles, totalResults: parseData.totalResults,
      loading : false})
      
  }
    async componentDidMount(){ 
      // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true});  
      // let data = await fetch(url);
      // let parseData = await data.json()
      // this.setState({articles: parseData.articles, totalResults: parseData.totalResults,
      // loading : false})
      this.update();
      // we can use update function rather the too much code
  }

  handlePreClick =async () => {
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});    
    // let data = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parseData.articles,
    //   loading: false})
     this.setState({
        page: this.state.page - 1});
        this.update()
      }
  handleNextClick = async () => {
  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/20))){
  //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true});  
  //   let data = await fetch(url);
  //     let parseData = await data.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseData.articles,
  //       loading :false})
  // }
    this.setState({
        page: this.state.page + 1});
        this.update()
      
}
fetchMoreData = async () => {
  this.setState({page:this.state.page + 1})
   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json()
      this.setState({
        articles:this.state.articles.concat(parseData.articles), 
        totalResults: parseData.totalResults
      })
  
  };
  render() {
    return (
      <>
          <h1 className='text-center my-4 text-danger'>Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
          {/* <div className="container d-flex justify-content-between my-4">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}> &larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}

          {this.state.loading && <Loading/>}
          {/* if this.state.loading is true then above component will display */}

            {/* below component is used for infinite scroll.. firstly we have to install their packages 
            annd then we will import infinite scroll component */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length != this.state.totalResults}
          loader={<Loading/>} >

          <div className="container">
          <div className='row justify-content-md-center'>
          {/* {!this.state.loading && this.state.articles.map((element)=> */}
          {/* // if loading is not true the contetn will display */}
          {this.state.articles.map((element)=>
          { return <NewsItems 
            key={element.url} 
            source={element.source.name?element.source.name.slice(0, 50):"Unknown"}
            title={element.title?element.title.slice(0, 50):"There is no Title for this News"} 
            description={element.description?element.description.slice(0, 90):"There is no any description for this news There is no any description for this news"} 
            author ={element.author?element.author:"Unknown"} 
            date={element.publishedAt?element.publishedAt:"Not Mentioned"}
            urlToImage={element.urlToImage?element.urlToImage:"https://media.istockphoto.com/photos/abstract-digital-news-concept-picture-id1290904409?s=612x612"}
            newsUrl={element.url}/>
             })}
          </div>
          </div>
          
          
        </InfiniteScroll>
          
          {/* <div className="container d-flex justify-content-between my-4">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}> &larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> 
          these are the button for previous and next page of news
          */}
      </>
    )
  }
}
