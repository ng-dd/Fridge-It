import React, { Component } from 'react';
import { connect } from 'react-redux';

class Amazon extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {

  };


  render() {
    return(
      <div>
        <h1>hello world test amazon</h1>
        <div id="amazon-root"></div>

        {/* <script type="text/javascript">
          {
            window.onAmazonLoginReady = function() {
              amazon.Login.setClientId('amzn1.application-oa2-client.5241a33ed1c24797b108ae0c6fa8afdc');
            }
            (function(d) {
              var a = d.createElement('script'); a.type = 'text/javascript';
              a.async = true; a.id = 'amazon-login-sdk';
              a.src = 'https://api-cdn.amazon.com/sdk/login1.js';
              d.getElementById('amazon-root').appendChild(a);
            })(document)
            }
          }  
        </script>
        <script type="text/javascript">
        {
          document.getElementById('LoginWithAmazon').onclick = function() {
          options = { scope : 'profile' };
          amazon.Login.authorize(options,
              'http://localhost:3000');
          return false;
          }
              }
        </script> */}



      </div>  
    )
  }
}

export default connect()(Amazon);