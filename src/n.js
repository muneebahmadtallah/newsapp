import React, { Component } from 'react'
import NewsItems from './NewsItems'

export default class News extends Component {
      articles = []
  constructor(){
      super();
      this.state={
        articles:[],
        page:1,
        pageSize :20
      }
  }

    async componentDidMount(){ 
      let url ="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1f239d8942694ea288ff52d01cfbe07c$page=1$pageSize=20";
      let data = await fetch(url);
      let parseData = await data.json()
    //   console.log(parseData);
      this.setState({articles: parseData.articles, totalResults: parseData.totalResults})
  }

  handlePreClick =async () => {
    let url =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${this.state.page -1}$pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json()
    //   console.log(parseData);
      this.setState({
        page: this.state.page - 1,
        articles: parseData.articles})
      }
  handleNextClick = async () => {
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${this.state.page +1}$pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json()
    //   console.log(parseData);
      this.setState({
        page: this.state.page +1,
        articles: parseData.articles})
 
  }}
  render() {
    return (
      <div className='container'>
          <h1 className='text-center'>News Application</h1>
          <div className='row  justify-content-md-center'>
          {this.state.articles.map((element)=>
          { return <NewsItems 
            key={element.url} 
            source={element.source.name?element.source.name.slice(0, 50):"Unknown"}
            title={element.title?element.title.slice(0, 50):"There is no Title for this News"} 
            description={element.description?element.description.slice(0, 90):"There is no any description for this news There is no any description for this news"} 
            urlToImage={element.urlToImage?element.urlToImage:"https://i.blogs.es/300d63/1366_2000/840_560.jpeg"}
            newsUrl={element.url}/>
             })}
             
          </div>
          
          <div className="container d-flex justify-content-between my-4">
              <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreClick}> &larr; Previous</button>
              <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
    )
  }
}
