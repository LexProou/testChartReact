import { Component } from "react";


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        console.log(error, info),
        this.setState({
           
            hasError: true
        });
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className="error-boundary">
                <h1>Произошла ошибка!</h1>
                <button onClick={() => this.setState({hasError: false})}>Попробовать снова</button>
                </div>
            )

           
        }
        return this.props.children;
         
    }
}

export default ErrorBoundary