formulaBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.value && prevActive) {
    let [result, isSuccess] = evaluateFormula(event.target.value);
    let row = Number(prevActive.getAttribute("data-row")) - 1;
    let col = Number(prevActive.getAttribute("data-col")) - 1;
    if (!isSuccess||isNaN(result)) {
      showAlert(
        "Please provide a valid expression and add space between each operator and operand"
      );
    } else {
      let currentDependencies = getDependencies(event.target.value);
      let prevDependencies = getDependencies(sheet[row][col].formula);
      removeDependencyFromParent(prevDependencies, row, col);
      addDependencyToParent(currentDependencies, row, col);
      let path=[];
      let containsCycle = detectCyle(row, col, new ArraySet(), new ArraySet(),path);
      if (containsCycle) {
        removeDependencyFromParent(currentDependencies, row, col);
        addDependencyToParent(prevDependencies, row, col);
        showAlert("Your formula contains cycle");
        console.log(path);
      } else {
        updateDependentCells(row, col);
        sheet[row][col].formula = event.target.value;
      }
    }
  }
});

function isComplexExpression(expression) {
  return expression.charCodeAt(0) >= 65 && expression.charCodeAt(0) <= 90;
}
function getCellLocation(expression) {
  try {
    let col = expression.charCodeAt(0) - 65;
    let row = Number(expression.substring(1)) - 1;
    return [row, col, true];
  } catch (error) {
    return [error.message, 0, false];
  }
}
function getDecodeFormula(encodedFormula) {
  let decodedFormula = encodedFormula.split(" ");
  decodedFormula.forEach((expression, index) => {
    if (isComplexExpression(expression)) {
      let [row, col, isSuccess] = getCellLocation(expression);
      if (!isSuccess) return [row, false];
      try {
        decodedFormula[index] = Number(sheet[row][col].value);
      } catch (error) {
        return [error.message, false];
      }
    }
  });
  return [decodedFormula.join(" "), true];
}
function evaluateFormula(encodedFormula) {
  let [decodedExpression, isSuccess] = getDecodeFormula(encodedFormula);
  if (!isSuccess) return [decodedExpression, false];
  try {
    return [eval(decodedExpression), true];
  } catch (error) {
    return [error.message, false];
  }
}
function getDependencies(encodedFormula) {
  if (!encodedFormula) return [];
  let decodedFormula = encodedFormula.split(" ");
  let dependencies = [];
  decodedFormula.forEach((expression) => {
    if (isComplexExpression(expression)) {
      let [row, col] = getCellLocation(expression);
      dependencies.push([row, col]);
    }
  });
  return dependencies;
}

function removeDependencyFromParent(dependencies, row, col) {
  dependencies.forEach((dependency) => {
    sheet[dependency[0]][dependency[1]].children.delete([row, col]);
  });
}
function addDependencyToParent(dependencies, row, col) {
  dependencies.forEach((dependency) => {
    sheet[dependency[0]][dependency[1]].children.add([row, col]);
  });
}

function updateDependentCells(row, col) {
  if (sheet[row][col].formula) {
    let [result] = evaluateFormula(sheet[row][col].formula);
    sheet[row][col].value = result;
  }
  let cell = document.querySelector(`[data-pos="${row + 1} ${col + 1}"]`);
  cell.value = sheet[row][col].value;
  let children = sheet[row][col].children.getAllAsArray();
  children.forEach((child) => {
    updateDependentCells(child[0], child[1]);
  });
}
function detectCyle(row, col, visited, dfs_visited, path) {
  if (visited.contains([row, col])) {
    if (dfs_visited.contains([row, col])) {
      path?.push([row, col]);
      return true;
    }
    return false;
  }
  dfs_visited.add([row, col]);
  visited.add([row, col]);
  path?.push([row, col]);
  let children = sheet[row][col].children.getAllAsArray();
  let flag = false;
  children.forEach((child) => {
    if (detectCyle(child[0], child[1], visited, dfs_visited,path)) {
      flag = true;
      return;
    }
  });
  if (!flag) {
    dfs_visited.delete([row, col]);
    path?.pop();
  }
  return flag;
}
