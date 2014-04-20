(function() {
  myApp.factory('AppFactory', [
    function() {
      return {
        fixedApps: function() {
          return [
            {
              id: "100",
              "package": "",
              app: "電話",
              activity: "",
              module: "Phone",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "green",
              icon: "icon-phone5"
            }, {
              id: "101",
              "package": "",
              app: "聯絡人",
              activity: "",
              module: "Contact",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#035997",
              icon: "icon-user5"
            }, {
              id: "102",
              "package": "",
              app: "電子郵件",
              activity: "",
              module: "mail",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#FED13D",
              icon: "icon-mail4"
            }, {
              id: "103",
              "package": "",
              app: "設定",
              activity: "",
              module: "Setting",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#008CD9",
              icon: "icon-cog4"
            }
          ];
        },
        apps: function() {
          return [
            {
              id: "104",
              "package": "",
              app: "Facebook",
              activity: "",
              module: "Facebook",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#3b5998",
              icon: "icon-facebook2"
            }, {
              id: "2",
              "package": "",
              app: "Twitter",
              activity: "",
              module: "Twitter",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#4099FF",
              icon: "icon-twitter2"
            }, {
              id: "3",
              "package": "",
              app: "Chrome",
              activity: "",
              module: "Chrome",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "orange",
              icon: "icon-chrome"
            }, {
              id: "4",
              "package": "",
              app: "Skype",
              activity: "",
              module: "Skype",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#12A5F4",
              icon: "icon-skype2"
            }, {
              id: "5",
              "package": "",
              app: "instagram",
              activity: "",
              module: "instagram",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#3f729b",
              icon: "icon-instagram2"
            }, {
              id: "6",
              "package": "",
              app: "SoundCloud",
              activity: "",
              module: "SoundCloud",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#ff7700",
              icon: "icon-soundcloud"
            }, {
              id: "7",
              "package": "",
              app: "linkedin",
              activity: "",
              module: "linkedin",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#0e76a8",
              icon: "icon-linkedin2"
            }, {
              id: "8",
              "package": "",
              app: "Youtube",
              activity: "",
              module: "Youtube",
              image: "tiles/IE_64.png",
              size: "1x1",
              theme: "#c4302b",
              icon: "icon-youtube2"
            }
          ];
        }
      };
    }
  ]);

}).call(this);
