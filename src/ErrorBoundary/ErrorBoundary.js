import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

    static defaultProps = {
        history: {
          goBack: () => { }
        },
      }

    static getDerivedStateFromError(error) {
        return { hasError: true };
      }

    render() {
    if (this.state.hasError) {      
        return (
            <div className="error-boundary">
                <h2>Uh-oh! Looks like you have encountered an error.</h2>
                <a href="/" className="go-home">Let's go home!</a>
            </div>
        );
    }
    return this.props.children;
    }  
}

export default ErrorBoundary