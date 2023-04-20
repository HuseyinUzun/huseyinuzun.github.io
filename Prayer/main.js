function greet() {
    var name = document.getElementById("nameInput").value;
    var greeting = "Merhaba," + name + " "+"Allah kabul etsin dualarını!";
    document.getElementById("greetingText").innerHTML = greeting;
  }