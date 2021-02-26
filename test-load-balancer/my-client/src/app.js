class AppCls {
  constructor() {
    //this.testAPI = "https://reqres.in/api/users/1";
    this.testAPI = "http://nodeapp-897323687.ap-south-1.elb.amazonaws.com/";

    this.setDefaults();
  }

  setDefaults() {
    this.successArr = [];
    this.failedArr = [];
    this.allArr = [];
    this.txtTime = 10;

    this.successHeader = "";
    this.failHeader = "";
    this.allHeader = "";
    this.intervalUnit = "milliseconds";

    this.stopInterval();
  }

  stopInterval() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
  }

  startInterval() {
    this.stopInterval();

    this.intervalHandle = setInterval(() => {
      this.fetchGetAPI(this.testAPI);
    }, this.txtTime);
  }

  btnGenericClick(val) {
    setTimeout(() => {
      if (val === 1) {
        this.startInterval();
      } else if (val === 0) {
        this.stopInterval();
      } else if (val === 2) {
        //this.setDefaults();
        window.location.reload(); //as late response can be received even after reset
      }
    }, 1);
  }

  addDataTimeStamp(obj, isEnd) {
    if (obj) {
      let dateTime = new Date();
      let timestamp =
        dateTime.toLocaleTimeString() + " " + dateTime.getMilliseconds(); // dateTime.toLocaleString()

      if (isEnd) {
        obj.endTime = "(res) " + timestamp;
      } else {
        obj.startTime = "(req) " + timestamp;
      }
    }

    return obj;
  }

  fetchGetAPI(url) {
    let promObj = new Promise((resolve, reject) => {
      if (url) {
        url += "?randomToAvoidCache=" + Math.floor(Math.random() * 10000000);

        let obj = {};
        this.addDataTimeStamp(obj);
        this.allArr.push(obj);
        this.allHeader = "Total API count : " + this.allArr.length;

        let fetchPromObj = fetch(url);
        fetchPromObj
          .then((data) => {
            obj.successData = data;
            this.addDataTimeStamp(obj, true);
            this.successArr.push(obj);
            this.successHeader =
              "Success API count : " + this.successArr.length;

            resolve();
          })
          .catch((err) => {
            obj.errorData = err;
            this.addDataTimeStamp(obj, true);
            this.failedArr.push(obj);
            this.failHeader = "Failed API count : " + this.failedArr.length;

            resolve();
          });
      } else {
        reject("no url defined");
      }
    });

    return promObj;
  }
}

export { AppCls };
