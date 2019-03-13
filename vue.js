new Vue({
  el: "#app",
  data: {
    newGameName: null,
    connected: true,
    games: [1, 2],
    main: null,
    dialog: false
  },
  async beforeCreate() {
    this.message = "yolo";
    const res = await axios.get("http://localhost:3000/games");
    this.games = res.data;
    // .then(function(response) {
    //   games.push(response.data);
    // });
  },
  methods: {
    async updateGames() {
      const res = await axios.get("http://localhost:3000/games");
      this.games = res.data;
    },
    async createNewGame() {
      const gameData = (await axios.post("http://localhost:3000/game/create", {
        gameName: this.newGameName
      })).data;
      const playerData = (await axios.post(
        "http://localhost:3000/game/add-player",
        {
          id: gameData.id
        }
      )).data;
      console.log(playerData);
      createPeerConnection(playerData.playerId);
      this.connected = false;
      this.dialog = false;
    },
    async connectToGame(id) {
      const res = await axios.post("http://localhost:3000/game/add-player", {
        id
      });
      createPeerConnection(res.data.playerId);
    }
  }
});
