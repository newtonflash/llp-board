var React = require('react');

class DefaultLayout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Task Boards</title>
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
                </head>
                <body>
                    {this.props.children}

                    <script src="/js/webpack.bundle.js"></script>
                </body>
            </html>
        );
    }
}

module.exports = DefaultLayout;
