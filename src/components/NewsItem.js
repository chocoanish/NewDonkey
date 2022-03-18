import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{width:"18rem"}}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {source} </span>
                    <img src={!imageUrl?"https://images.indianexpress.com/2022/03/Girl-Hackathon-2022.jpg":imageUrl} className='card-img-top' alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {date}</small></p>
                        <p className="card-text">{description}...</p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
