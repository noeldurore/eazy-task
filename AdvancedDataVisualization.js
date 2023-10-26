// FileName: AdvancedDataVisualization.js

/*
This code is an advanced data visualization application. It takes in a dataset of employee records
and generates interactive visualizations to analyze the data. The application calculates various
employee statistics and presents them in the form of charts and graphs.

Please note that this code requires the D3.js library to run and visualize the data.

*/

// D3.js initialization
const svgContainer = d3.select("body").append("svg")
  .attr("width", 800)
  .attr("height", 600);

// Employee dataset
const employees = [
  { id: 1, name: "John Doe", age: 32, salary: 50000, department: "Finance" },
  { id: 2, name: "Jane Smith", age: 28, salary: 60000, department: "HR" },
  { id: 3, name: "Bob Johnson", age: 45, salary: 70000, department: "Sales" },
  // ... more employee records
];

// Function to calculate average salary
function calculateAverageSalary() {
  const totalSalary = employees.reduce((acc, employee) => acc + employee.salary, 0);
  return totalSalary / employees.length;
}

// Function to generate a bar chart of employee ages
function generateAgeChart() {
  const ageData = employees.map(employee => employee.age);

  const xScale = d3.scaleBand().domain(ageData.map((_, i) => i))
    .range([0, 600])
    .padding(0.1);

  const yScale = d3.scaleLinear().domain([0, d3.max(ageData)]).range([0, 400]);

  svgContainer.selectAll("rect")
    .data(ageData)
    .enter()
    .append("rect")
    .attr("x", (_, i) => xScale(i))
    .attr("y", d => 600 - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d))
    .attr("fill", "steelblue");
}

// Function to generate a pie chart of employee departments
function generateDepartmentChart() {
  const departments = employees.map(employee => employee.department);
  const departmentCounts = {};

  departments.forEach(department => {
    departmentCounts[department] = departmentCounts[department] + 1 || 1;
  });

  const pieGenerator = d3.pie().sort(null).value(d => d.value);

  const arcs = pieGenerator(d3.entries(departmentCounts));

  const arcGenerator = d3.arc().innerRadius(0).outerRadius(200);

  const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);

  svgContainer.selectAll("path")
    .data(arcs)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("fill", d => colorScale(d.data.key))
    .attr("transform", "translate(400, 300)");
}

// Generate the visualizations
generateAgeChart();
generateDepartmentChart();

// Print average salary to the console
console.log("Average Salary:", calculateAverageSalary());