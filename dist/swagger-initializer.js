function getDoctorToken() {
  let postObj = {
    email: "doctor@docta.io",
    password: "abdo@123"
  }

  let post = JSON.stringify(postObj)

  const url = "http://38.242.155.165:4000/api/v1/d/auth/login"
  let xhr = new XMLHttpRequest()

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(post);

  xhr.onload = function (res) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response).token)
      localStorage.setItem('authKey', JSON.parse(xhr.response).token)

    }
  }

}

function getPatientToken() {
  /* Data which will be sent to server */
  let postObj = {
    email: "patient@docta.io",
    password: "abdo@123"
  }
  // We can use XHR to post the data to a web server like so:

  let post = JSON.stringify(postObj)

  const url = "http://38.242.155.165:4000/api/v1/auth/login"
  let xhr = new XMLHttpRequest()

  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
  xhr.send(post);

  xhr.onload = function (res) {
    if (xhr.status === 200) {
      console.log("Post successfully created!")
      console.log(JSON.parse(xhr.response).token)
      document.querySelector("#patient-token").value =JSON.parse(xhr.response).token;
    }
  }

}

window.onload = function () {
  //<editor-fold desc="Changeable Configuration Block">


  // localStorage.setItem('env', 'desktop.yaml')
  getDoctorToken();
  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url:  localStorage.getItem("env") ? localStorage.getItem("env") : 'main.yaml' ,
    dom_id: '#swagger-ui',
    deepLinking: true,
    docExpansion: "none",
    // requestInterceptor: function (req) {
    //   var key = localStorage.getItem("authKey");
    //   if (key && key.trim() !== "") {
    //       req.headers.Authorization = 'Bearer ' + key;
    //   }
    // },
    persistAuthorization: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });

  //</editor-fold>


  document.querySelector('.download-url-button').addEventListener('click', () => {
    var e = document.querySelector('.download-url-input').value;
    localStorage.setItem('env', e)
  });
};



