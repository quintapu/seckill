import * as React from 'react';

import './seckill.scss';
import { Http } from '../service/http';

class Seckill extends React.Component {

    http = new Http();

    constructor () {
        super();
        this.state = {
            restCount: 100,
            spendCount: 0
        }
        this.seckillClick = this.seckillClick.bind(this);
    }

    seckillClick () {
        this.http.post('api/seckill', {}).then((result) => {
            console.log(result);
            if (result.success) {
                this.setState({
                restCount: result.data[0],
                spendCount: 100 - result.data[0]
            });
            }           
        })
        
    }

    render(){
        return(
            <div className="count-content">
                <form action="">
                    <h3 className="form-title">Seckill</h3>
                    <p className="rest-count"><span className="count-text">rest count: </span> <span className="count-number">{this.state.restCount}</span></p>
                    <p className="spend-count"><span className="count-text">spend count: </span> <span className="count-number">{this.state.spendCount}</span></p>
                    <button type="button" onClick={this.seckillClick}>seckill</button>
                </form>
            </div>
        )
    }
}

export default Seckill;