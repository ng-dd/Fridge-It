import React, { Component } from 'react';

class Amazon extends Component {
  constructor(props) {
    super(props);
    
  }


  render() {
    return(
      <div>
        <div id="amazon-root"></div>

        <script type="text/javascript">
          {
            window.onAmazonLoginReady = function() {
              amazon.Login.setClientId('YOUR-CLIENT-ID');
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
        </script>

        <a href id="LoginWithAmazon">
        <img border="0" alt="Login with Amazon"
        src="http://g-ecx.images-amazon.com/images/G/01/lwa/btnLWA_gry_156x132.png"
        width="156" height="32" />
        </a>


      </div>  
    )
  }
}

export default connect(null)(Amazon);