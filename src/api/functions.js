import axios from "axios"

let FLASK_URL = "https://bookra.pythonanywhere.com/"

const sampleReturn = {
    colorizedText: "I'm returning from axios...sych!",
    topicLayout: [.09, .06, .8, .5, .17],
    similarDocs: [
        { text: 'lorem  Ipsum', title: "Ruk", link: "#" },
        { text: 'Your Friend', title: "sfdsdf", link: "#" },
        { text: 'Dowager', title: "dsfsdbx", link: "#" },
        { text: 'BNUMCHUGKS BUDy', title: "SMTHdfsfgsING", link: "#" }]
}

// export default function 

let apiClass = {
    postAbst: function(my_abst){
        console.log("activating axios")
        return axios.post(FLASK_URL+"/abst_subm", {
            abstract: my_abst
        })
    },
    getRandom: function(){
        console.log("getting random")
        return axios.get(FLASK_URL+"/get_rand_abst")
    },
    getSimilars: function(my_abst){
        console.log("getting similars")
        return axios.post(FLASK_URL+"/get_similars",{
            abstract: my_abst
        })
    }
}


export { apiClass }
