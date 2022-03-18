import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 9,
        category: 'general'
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async update(){
        console.log(this.state.page +"  update")
        const Url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fe3e661dc344318ae7f8880a9652a32&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(Url);
        let parsedData = await data.json();
        this.setState({ 
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
            })
    }
    async componentDidMount() {
        this.update();
    }
    handlePrevClick = async () => {
        console.log(this.state.page +"  prev")
        this.setState({page: this.state.page - 1})
        this.update()  
    }
    handleNextClick = async () => {
        console.log(this.state.page +"  next")
        // console.log(this.state.page+1)
        this.setState({page: this.state.page + 1})
        console.log(this.state.page +"  next")
        this.update() 
    }
    render() {
        return (
            <div className='container my-4 text-center'>
                <h1 className='text-center'>NewsDonkey</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt.slice(0,10)} source={element.source.name}/>
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}
