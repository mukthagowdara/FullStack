var contentNode1 = document.getElementById('name');
var component1 = <h3>Muktha Shivakumar Gowdara</h3>;        

var contentNode2 = document.getElementById('image');
var component2 = <img src="../mee.jpg" alt="My picture"></img>;  

var contentNode3 = document.getElementById('desc');
var component3 = <p>Master's student at San Diego State University</p>;  

var contentNode4 = document.getElementById('link');
var component4 = <form action="https://github.com/mukthagowdara/FullStack">
<button type="submit">VIEW MY GITHUB REPO</button>
</form>;  


ReactDOM.render(component1, contentNode1);
ReactDOM.render(component2, contentNode2);
ReactDOM.render(component3, contentNode3);
ReactDOM.render(component4, contentNode4);      
