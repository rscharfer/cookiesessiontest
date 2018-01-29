function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5XSuZvIHPZx":
        Script1();
        break;
      case "66PBwqTkmdB":
        Script2();
        break;
      case "5Zj8LwEDGOQ":
        Script3();
        break;
      case "5VZU1N5Ex4Q":
        Script4();
        break;
      case "6Dad28Bxdj2":
        Script5();
        break;
      case "6PKgT16Zko3":
        Script6();
        break;
      case "5v5QDE4hXiZ":
        Script7();
        break;
      case "5neuFe9dHRZ":
        Script8();
        break;
      case "5VBstg8vt4W":
        Script9();
        break;
      case "6c5bj2mb4Vm":
        Script10();
        break;
  }
}

function Script1()
{
  postToLRS(localStorage["User"], "experienced", "Storyline Dummy", "Slide 1" )
}

function Script2()
{
  postToLRS(localStorage["User"], "completed", "Storyline Dummy", "Storyline Dummy Module" )
}

function Script3()
{
  postToLRS(localStorage["User"], "experienced", "Storyline Dummy", "Slide 2" )
}

function Script4()
{
  postToLRS(localStorage["User"], "completed", "Storyline Dummy", "Storyline Dummy Module" )
}

function Script5()
{
  postToLRS(localStorage["User"], "experienced", "Storyline Dummy", "Slide 3" )
}

function Script6()
{
  postToLRS(localStorage["User"], "completed", "Storyline Dummy", "Storyline Dummy Module" )
}

function Script7()
{
  postToLRS(localStorage["User"], "passed", "Storyline Dummy", "Storyline Dummy Module" )
}

function Script8()
{
  postToLRS(localStorage["User"], "failed", "Storyline Dummy", "Storyline Dummy Module" )
}

function Script9()
{
  postToLRS(localStorage["User"], "completed", "Storyline Dummy", "Storyline Dummy Module" )
}

function Script10()
{
  postToLRS(localStorage["User"], "experienced", "Storyline Dummy", "Quiz" )
}

