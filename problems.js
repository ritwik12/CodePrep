const defaultProblems = [
  {
    id: "course-schedule",
    title: "207. Course Schedule",
    difficulty: "Medium",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/course-schedule/",
    entryPoint: "canFinish",
    companyTags: ["Google", "Meta", "Amazon", "Uber"],
    description: `
      <p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [ai, bi]</code> indicates that you <strong>must</strong> take course <code>bi</code> first if you want to take course <code>ai</code>.</p>
      <ul>
        <li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li>
      </ul>
      <p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> true\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0. So it is possible.</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> numCourses = 2, prerequisites = [[1,0],[0,1]]\n<strong>Output:</strong> false\n<strong>Explanation:</strong> There are a total of 2 courses to take. \nTo take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.</pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= numCourses <= 2000</code></li>
        <li><code>0 <= prerequisites.length <= 5000</code></li>
        <li><code>prerequisites[i].length == 2</code></li>
        <li><code>0 <= ai, bi < numCourses</code></li>
        <li>All the pairs prerequisites[i] are <strong>unique</strong>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[2, [[1,0]]]', expected: true },
      { input: '[2, [[1,0],[0,1]]]', expected: false },
      { input: '[3, [[1,0],[2,1]]]', expected: true },
      { input: '[3, [[1,0],[0,2],[2,1]]]', expected: false, hidden: true }
    ],
    explanation: `
      <h4>Algorithm Explanation</h4>
      <p>This is a cycle detection problem in a directed graph. We can represent courses as nodes and prerequisites as directed edges. If the graph has a cycle, it is impossible to finish all courses.</p>
    `,
    followUps: [
      "Can you solve this using Kahn's algorithm (BFS)?",
      "What is the space complexity of your graph representation?",
      "How would you modify this to find the actual topological ordering of courses?"
    ]
  },
  {
    id: "course-schedule-ii",
    title: "210. Course Schedule II",
    difficulty: "Medium",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/course-schedule-ii/",
    entryPoint: "findOrder",
    companyTags: ["Google", "Meta", "Amazon", "Microsoft"],
    description: `
      <p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [ai, bi]</code> indicates that you <strong>must</strong> take course <code>bi</code> first if you want to take course <code>ai</code>.</p>
      <ul>
        <li>For example, the pair <code>[0, 1]</code>, indicates that to take course <code>0</code> you have to first take course <code>1</code>.</li>
      </ul>
      <p>Return <em>the ordering of courses you should take to finish all courses</em>. If there are many valid answers, return <strong>any</strong> of them. If it is impossible to finish all courses, return <strong>an empty array</strong>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> numCourses = 2, prerequisites = [[1,0]]\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\n<strong>Output:</strong> [0,2,1,3]\n<strong>Explanation:</strong> There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. So [0,1,2,3] is also a correct order.</pre>
      
      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> numCourses = 1, prerequisites = []\n<strong>Output:</strong> [0]</pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= numCourses <= 2000</code></li>
        <li><code>0 <= prerequisites.length <= 5000</code></li>
        <li><code>prerequisites[i].length == 2</code></li>
        <li><code>0 <= ai, bi < numCourses</code></li>
        <li><code>ai != bi</code></li>
        <li>All the pairs prerequisites[i] are <strong>unique</strong>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[2, [[1,0]]]', expected: [0, 1] },
      { input: '[4, [[1,0],[2,0],[3,1],[3,2]]]', expected: [0, 1, 2, 3] },
      { input: '[2, [[1,0],[0,1]]]', expected: [] },
      { input: '[3, [[1,0],[1,2],[2,0]]]', expected: [], hidden: true }
    ],
    explanation: `
      <h4>Algorithm Explanation</h4>
      <p>This is topological sort. We can use Kahn's algorithm (BFS) or post-order DFS to collect the topological sorting of the directed acyclic graph (DAG).</p>
    `,
    followUps: [
      "If there are multiple topological orders, how can we return the lexicographically smallest one?",
      "Can we optimize the space complexity by reusing the input array?"
    ]
  },
  {
    id: "alien-dictionary",
    title: "269. Alien Dictionary",
    difficulty: "Hard",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/alien-dictionary/",
    entryPoint: "alienOrder",
    companyTags: ["Google", "Meta", "Amazon", "Twitter"],
    description: `
      <p>There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.</p>
      <p>You are given a list of strings <code>words</code> from the alien language's dictionary. Now, the strings in <code>words</code> are <strong>sorted lexicographically</strong> by the rules of this new language.</p>
      <p>Return <em>a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules</em>. If there is no valid ordering, return <code>""</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> words = ["wrt","wrf","er","ett","rft"]\n<strong>Output:</strong> "wertf"</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> words = ["z","x"]\n<strong>Output:</strong> "zx"</pre>
      
      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> words = ["z","x","z"]\n<strong>Output:</strong> ""\n<strong>Explanation:</strong> The order is invalid, so return "".</pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= words.length <= 100</code></li>
        <li><code>1 <= words[i].length <= 100</code></li>
        <li><code>words[i]</code> consists of only lowercase English letters.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def alienOrder(self, words: List[str]) -> str:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[["wrt","wrf","er","ett","rft"]]', expected: "wertf" },
      { input: '[["z","x"]]', expected: "zx" },
      { input: '[["z","x","z"]]', expected: "" },
      { input: '[["abc","ab"]]', expected: "", hidden: true }
    ],
    explanation: `
      <h4>Algorithm Explanation</h4>
      <p>Compare adjacent words lexicographically to extract rules. Build a directed graph and perform topological sort.</p>
    `,
    followUps: [
      "What should your solution return if there are multiple valid orders?",
      "How do you handle isolated characters that don't have any explicit relationships in words?"
    ]
  },
  {
    id: "parallel-courses",
    title: "1136. Parallel Courses",
    difficulty: "Medium",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/parallel-courses/",
    entryPoint: "minimumSemesters",
    companyTags: ["Google", "Uber", "Microsoft"],
    description: `
      <p>You are given an integer <code>n</code>, which represents the number of courses labeled from <code>1</code> to <code>n</code>. You are also given an array <code>relations</code> where <code>relations[i] = [prevCourse, nextCourse]</code> indicates a prerequisite relationship.</p>
      <p>In one semester, you can take any number of courses as long as you have taken all prerequisites for those courses.</p>
      <p>Return <em>the minimum number of semesters needed to study all courses</em>. If there is no way to study all courses, return <code>-1</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> n = 3, relations = [[1,3],[2,3]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> In the first semester, we can take courses 1 and 2. In the second semester, we take course 3.</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> n = 3, relations = [[1,2],[2,3],[3,1]]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> There is a cycle, so we cannot take any course.</pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= n <= 5000</code></li>
        <li><code>0 <= relations.length <= 5000</code></li>
        <li><code>relations[i].length == 2</code></li>
        <li><code>1 <= prevCoursei, nextCoursei <= n</code></li>
        <li><code>prevCoursei != nextCoursei</code></li>
        <li>All pairs <code>relations[i]</code> are unique.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def minimumSemesters(self, n: int, relations: List[List[int]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[3, [[1,3],[2,3]]]', expected: 2 },
      { input: '[3, [[1,2],[2,3],[3,1]]]', expected: -1 },
      { input: '[4, [[1,2],[3,4]]]', expected: 2, hidden: true }
    ],
    explanation: `
      <h4>Algorithm Explanation</h4>
      <p>This is BFS topological sort (Kahn's) with level-order traversal. Each level corresponds to one semester.</p>
    `,
    followUps: [
      "Can we solve this using DFS and finding the longest path in DAG?",
      "How would you adapt the algorithm if there's a limit on the number of courses you can take per semester?"
    ]
  },
  {
    id: "clone-graph",
    title: "133. Clone Graph",
    difficulty: "Medium",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/clone-graph/",
    entryPoint: "cloneGraph",
    companyTags: ["Meta", "Amazon", "Google", "Bloomberg"],
    description: `
      <p>Given a reference of a node in a <strong>connected undirected graph</strong>. Return a <strong>deep copy (clone)</strong> of the graph.</p>
      <p>Each node in the graph contains a value (<code>int</code>) and a list of its neighbors (<code>List[Node]</code>).</p>
      
      <pre>
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
      </pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li>The number of nodes in the graph is in the range <code>[0, 100]</code>.</li>
        <li><code>1 <= Node.val <= 100</code></li>
        <li><code>Node.val</code> is unique for each node.</li>
        <li>There are no repeated edges and no self-loops in the graph.</li>
        <li>The Graph is connected and all nodes can be visited starting from the first node.</li>
      </ul>
    `,
    starterCode: `# Definition for a Node.
# class Node:
#     def __init__(self, val = 0, neighbors = None):
#         self.val = val
#         self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[2,4],[1,3],[2,4],[1,3]]', expected: [[2,4],[1,3],[2,4],[1,3]] },
      { input: '[[]]', expected: [[]] },
      { input: '[]', expected: [] },
      { input: '[[2],[1]]', expected: [[2],[1]], hidden: true }
    ],
    explanation: `
      <h4>Algorithm Explanation</h4>
      <p>Use a hash map to map original nodes to their cloned counterparts. Perform a DFS or BFS traversal.</p>
    `,
    followUps: [
      "Can you write this using BFS instead of DFS recursion?",
      "How does recursion depth limit affect DFS clone on extremely large graph lines?"
    ]
  },
  {
    id: "number-of-islands",
    title: "200. Number of Islands",
    difficulty: "Medium",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/number-of-islands/",
    entryPoint: "numIslands",
    companyTags: ["Amazon", "Google", "Meta", "Bloomberg"],
    description: `
      <p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return <em>the number of islands</em>.</p>
      <p>An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
<strong>Output:</strong> 1</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
<strong>Output:</strong> 3</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>m == grid.length</code></li>
        <li><code>n == grid[i].length</code></li>
        <li><code>1 <= m, n <= 300</code></li>
        <li><code>grid[i][j]</code> is <code>'0'</code> or <code>'1'</code>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]]', expected: 1 },
      { input: '[[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]]', expected: 3 },
      { input: '[[["0","0","0"],["0","0","0"]]]', expected: 0, hidden: true }
    ],
    explanation: `
      <h4>Algorithm Explanation</h4>
      <p>Traverse the grid. When encountering a <code>'1'</code>, trigger a DFS or BFS traversal to sink all connected pieces of land (change <code>'1'</code> to <code>'0'</code>).</p>
    `,
    followUps: [
      "Can we solve this using Union-Find (Disjoint Set Union)?",
      "If the grid is extremely large and stored on disk, how would you find the number of islands?"
    ]
  },
  {
    id: "reconstruct-itinerary",
    title: "332. Reconstruct Itinerary",
    difficulty: "Hard",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/reconstruct-itinerary/",
    entryPoint: "findItinerary",
    companyTags: ["Google", "Uber", "Airbnb"],
    description: `
      <p>You are given a list of airline tickets where <code>tickets[i] = [from, to]</code> represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.</p>
      <p>All of the tickets belong to a man who departs from <code>"JFK"</code>. Thus, the itinerary must begin with <code>"JFK"</code>.</p>
      <p>If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.</p>
      <ul>
        <li>For example, the itinerary <code>["JFK", "LGA"]</code> has a smaller lexical order than <code>["JFK", "LGB"]</code>.</li>
      </ul>
      <p>You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]\n<strong>Output:</strong> ["JFK","MUC","LHR","SFO","SJC"]</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]\n<strong>Output:</strong> ["JFK","ATL","JFK","SFO","ATL","SFO"]\n<strong>Explanation:</strong> Another reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"]. But it is larger lexicographically.</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= tickets.length <= 300</code></li>
        <li><code>tickets[i].length == 2</code></li>
        <li><code>from</code> and <code>to</code> consist of three uppercase English letters.</li>
        <li><code>from != to</code>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]]', expected: ["JFK","MUC","LHR","SFO","SJC"] },
      { input: '[[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]]', expected: ["JFK","ATL","JFK","SFO","ATL","SFO"] }
    ],
    explanation: `
      <h4>Hierholzer's Algorithm (Eulerian Path)</h4>
      <p>Sort neighbors lexically. Traverse nodes recursively using DFS, popping edges as they are used. Append nodes to itinerary in post-order, and then reverse the final array.</p>
    `,
    followUps: [
      "Why is backtracking or Hierholzer's required here rather than simple greedy DFS?",
      "What happens if there are cycles and dead ends in ticket paths?"
    ]
  },
  {
    id: "evaluate-division",
    title: "399. Evaluate Division",
    difficulty: "Medium",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/evaluate-division/",
    entryPoint: "calcEquation",
    companyTags: ["Google", "Amazon", "Meta"],
    description: `
      <p>You are given an array of variable equations <code>equations</code> and an array of real numbers <code>values</code>, where <code>equations[i] = [Ai, Bi]</code> and <code>values[i]</code> represent the equation <code>Ai / Bi = values[i]</code>.</p>
      <p>You are also given some <code>queries</code>, where <code>queries[j] = [Cj, Dj]</code> represents the query to find the value of <code>Cj / Dj</code>.</p>
      <p>Return <em>the answers to all queries</em>. If a single answer cannot be determined, return <code>-1.0</code>.</p>
      <p><strong>Note:</strong> The input is always valid. You may assume that evaluating the queries will not result in division by zero.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]\n<strong>Output:</strong> [6.0,0.5,-1.0,1.0,-1.0]\n<strong>Explanation:</strong> \nGiven: a / b = 2.0, b / c = 3.0\nqueries: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?\nreturn: [6.0, 0.5, -1.0, 1.0, -1.0 ]</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= equations.length <= 20</code></li>
        <li><code>equations[i].length == 2</code></li>
        <li><code>1 <= Ai.length, Bi.length <= 5</code></li>
        <li><code>values.length == equations.length</code></li>
        <li><code>0.0 < values[i] <= 20.0</code></li>
        <li><code>1 <= queries.length <= 20</code></li>
        <li><code>queries[j].length == 2</code></li>
        <li>Variables consist of lowercase English letters and digits.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]]', expected: [6.0,0.5,-1.0,1.0,-1.0] }
    ],
    explanation: `
      <h4>Graph Modeling with Weighted Edges</h4>
      <p>Represent variables as nodes and division values as directed weighted edges. Find paths using DFS or BFS, multiplying weights along the path.</p>
    `,
    followUps: [
      "Can we solve this using Union-Find with weights?",
      "What is the time complexity of the Union-Find approach compared to DFS query evaluations?"
    ]
  },
  {
    id: "network-delay-time",
    title: "743. Network Delay Time",
    difficulty: "Medium",
    category: "Graphs & Cycle Detection",
    leetcodeLink: "https://leetcode.com/problems/network-delay-time/",
    entryPoint: "networkDelayTime",
    companyTags: ["Google", "Amazon", "Microsoft"],
    description: `
      <p>You are given a network of <code>n</code> nodes, labeled from <code>1</code> to <code>n</code>. You are also given <code>times</code>, a list of travel times as directed edges <code>times[i] = (ui, vi, wi)</code>, where <code>ui</code> is the source node, <code>vi</code> is the target node, and <code>wi</code> is the time it takes for a signal to travel from source to target.</p>
      <p>We will send a signal from a given node <code>k</code>. Return <em>the minimum time it takes for all the <code>n</code> nodes to receive the signal</em>. If it is impossible for all the <code>n</code> nodes to receive the signal, return <code>-1</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2\n<strong>Output:</strong> 2</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> times = [[1,2,1]], n = 2, k = 1\n<strong>Output:</strong> 1</pre>
      
      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> times = [[1,2,1]], n = 2, k = 2\n<strong>Output:</strong> -1</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= k <= n <= 100</code></li>
        <li><code>1 <= times.length <= 6000</code></li>
        <li><code>times[i].length == 3</code></li>
        <li><code>1 <= ui, vi <= n</code></li>
        <li><code>ui != vi</code></li>
        <li><code>0 <= wi <= 100</code></li>
        <li>All the pairs <code>(ui, vi)</code> are unique.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[[2,1,1],[2,3,1],[3,4,1]], 4, 2]', expected: 2 },
      { input: '[[[1,2,1]], 2, 1]', expected: 1 },
      { input: '[[[1,2,1]], 2, 2]', expected: -1 }
    ],
    explanation: `
      <h4>Dijkstra's Algorithm (Single Source Shortest Path)</h4>
      <p>Use a min-heap to explore the closest nodes first. Maintain distances. Return the maximum distance once all nodes are reached.</p>
    `,
    followUps: [
      "Can we use Bellman-Ford or SPFA here? When would they be preferred?",
      "What is the heap time complexity in terms of vertices V and edges E?"
    ]
  },
  {
    id: "design-excel-sum-formula",
    title: "631. Design Excel Sum Formula",
    difficulty: "Hard",
    category: "Advanced LLD & Dependencies",
    leetcodeLink: "https://leetcode.com/problems/design-excel-sum-formula/",
    entryPoint: "Excel",
    isClassDesign: true,
    className: "Excel",
    companyTags: ["Microsoft", "Google", "Amazon"],
    description: `
      <p>Design a basic spreadsheet supporting cells with integer values and dynamic sum formulas.</p>
      <p>Implement the <code>Excel</code> class:</p>
      <ul>
        <li><code>__init__(height, width)</code>: Initializes grid size. Column header is a char 'A' to 'Z', rows are 1 to height.</li>
        <li><code>set(row, column, val)</code>: Sets cell value. Removes previous sum formulas.</li>
        <li><code>get(row, column)</code>: Returns current cell value.</li>
        <li><code>sum(row, column, numbers)</code>: Sets cell to represent the sum of given numbers. The list <code>numbers</code> contains coordinates like <code>"A1"</code> or ranges like <code>"F2:G7"</code>. Updates dynamically when dependencies update!</li>
      </ul>
      
      <h5>Example Command Sequence:</h5>
      <pre>
let excel = new Excel(3, "C"); // Spreadsheet of 3 rows, cols A, B, C
excel.set(1, "A", 2);
excel.get(1, "A"); // returns 2
excel.sum(3, "C", ["A1", "F1:G2"]); // C3 is now A1 + F1:G2 (initially 2)
excel.set(1, "A", 3);
excel.get(3, "C"); // returns 3 (since C3 automatically updates!)
      </pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= height <= 26</code></li>
        <li><code>width</code> is a character from <code>'A'</code> to <code>'Z'</code>.</li>
        <li><code>row</code> is in range <code>[1, height]</code>.</li>
        <li><code>column</code> is in range <code>['A', width]</code>.</li>
        <li>At most <code>100</code> calls will be made to <code>set</code>, <code>get</code>, and <code>sum</code>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Excel:
    def __init__(self, height: int, width: str):
        pass

    def set(self, row: int, column: str, val: int) -> None:
        pass

    def get(self, row: int, column: str) -> int:
        return 0

    def sum(self, row: int, column: str, numbers: List[str]) -> int:
        return 0`,
    testCases: [
      {
        input: '{"commands": ["Excel", "set", "get", "sum", "get", "set", "get"], "arguments": [[3, "C"], [1, "A", 2], [1, "A"], [3, "C", ["A1"]], [3, "C"], [1, "A", 3], [3, "C"]]}',
        expected: [null, null, 2, 2, 2, null, 3]
      },
      {
        input: '{"commands": ["Excel", "set", "set", "sum", "get", "set", "get"], "arguments": [[5, "E"], [1, "A", 5], [1, "B", 10], [2, "C", ["A1:B1"]], [2, "C"], [1, "A", 10], [2, "C"]]}',
        expected: [null, null, null, 15, 15, null, 20]
      }
    ],
    explanation: `
      <h4>Excel Sum Graph Propagation</h4>
      <p>We model this as a Directed Dependency Graph. Cells are nodes. C is set to SUM of A and B, directed edges exist: A -> C and B -> C.</p>
    `,
    followUps: [
      "How do you check or prevent circular dependencies?",
      "Can we optimize calculations using memoization?"
    ]
  },
  {
    id: "lru-cache",
    title: "146. LRU Cache",
    difficulty: "Medium",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/lru-cache/",
    entryPoint: "LRUCache",
    isClassDesign: true,
    className: "LRUCache",
    companyTags: ["Google", "Amazon", "Meta", "Bloomberg", "Apple"],
    description: `
      <p>Design a data structure that follows the constraints of a <strong>Least Recently Used (LRU) cache</strong>.</p>
      <p>Implement the <code>LRUCache</code> class:</p>
      <ul>
        <li><code>LRUCache(int capacity)</code>: Initialize the LRU cache with positive size <code>capacity</code>.</li>
        <li><code>int get(int key)</code>: Return the value of the <code>key</code> if the key exists, otherwise return <code>-1</code>.</li>
        <li><code>void put(int key, int value)</code>: Update the value of the <code>key</code> if the <code>key</code> exists. Otherwise, add the <code>key-value</code> pair to the cache. If the number of keys exceeds the <code>capacity</code> from this operation, <strong>evict</strong> the least recently used key.</li>
      </ul>
      <p>The functions <code>get</code> and <code>put</code> must each run in <code>O(1)</code> average time complexity.</p>
      
      <h5>Example 1:</h5>
      <pre>
<strong>Input</strong>
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
<strong>Output</strong>
[null, null, null, 1, null, -1, null, -1, 3, 4]

<strong>Explanation</strong>
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
      </pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= capacity <= 3000</code></li>
        <li><code>0 <= key <= 10<sup>4</sup></code></li>
        <li><code>0 <= value <= 10<sup>5</sup></code></li>
        <li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>get</code> and <code>put</code>.</li>
      </ul>
    `,
    starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        return -1

    def put(self, key: int, value: int) -> None:
        pass`,
    testCases: [
      {
        input: '{"commands": ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"], "arguments": [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]}',
        expected: [null, null, null, 1, null, -1, null, -1, 3, 4]
      }
    ],
    explanation: `
      <h4>Double Linked List + Hash Map</h4>
      <p>Pair a Doubly Linked List (insertion/access order) with a Hash Map (O(1) key node lookup).</p>
    `,
    followUps: [
      "Can we implement this quickly in Python using <code>collections.OrderedDict</code>?",
      "Why is a Doubly Linked List preferred over a Singly Linked List for O(1) node deletion?"
    ]
  },
  {
    id: "lfu-cache",
    title: "460. LFU Cache",
    difficulty: "Hard",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/lfu-cache/",
    entryPoint: "LFUCache",
    isClassDesign: true,
    className: "LFUCache",
    companyTags: ["Google", "Amazon", "Microsoft"],
    description: `
      <p>Design and implement a data structure for a <strong>Least Frequently Used (LFU) cache</strong>.</p>
      <p>Implement the <code>LFUCache</code> class:</p>
      <ul>
        <li><code>LFUCache(int capacity)</code>: Initializes the object with the <code>capacity</code> of the data structure.</li>
        <li><code>int get(int key)</code>: Gets the value of the <code>key</code> if the key exists in the cache. Otherwise, returns <code>-1</code>.</li>
        <li><code>void put(int key, int value)</code>: Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the <strong>least frequently used</strong> key before inserting a new item. For this problem, when there is a <strong>tie</strong> (i.e., two or more keys with the same frequency), the <strong>least recently used</strong> key would be invalidated.</li>
      </ul>
      <p>The functions <code>get</code> and <code>put</code> must each run in <code>O(1)</code> average time complexity.</p>
      
      <h5>Example 1:</h5>
      <pre>
<strong>Input</strong>
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
<strong>Output</strong>
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]
      </pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>0 <= capacity <= 10<sup>4</sup></code></li>
        <li><code>0 <= key <= 10<sup>5</sup></code></li>
        <li><code>0 <= value <= 10<sup>9</sup></code></li>
        <li>At most <code>2 * 10<sup>5</sup></code> calls will be made to <code>get</code> and <code>put</code>.</li>
      </ul>
    `,
    starterCode: `class LFUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        return -1

    def put(self, key: int, value: int) -> None:
        pass`,
    testCases: [
      {
        input: '{"commands": ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"], "arguments": [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]}',
        expected: [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
      }
    ],
    explanation: `
      <h4>Double Linked Lists Map by Frequency</h4>
      <p>Maintain lookup maps for nodes, lists of nodes grouped by frequencies, and track <code>min_frequency</code>.</p>
    `,
    followUps: [
      "What happens to the min_frequency pointer when a key's frequency is updated?",
      "Can we implement this using a single sorted tree or list? What would be the complexity?"
    ]
  },
  {
    id: "browser-history",
    title: "1472. Design Browser History",
    difficulty: "Medium",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/design-browser-history/",
    entryPoint: "BrowserHistory",
    isClassDesign: true,
    className: "BrowserHistory",
    companyTags: ["Bloomberg", "Google", "Roblox"],
    description: `
      <p>You have a browser of one tab where you start on the <code>homepage</code> and you can visit other <code>url</code>s, get back in the history number of <code>steps</code> or forward in the history number of <code>steps</code>.</p>
      <p>Implement the <code>BrowserHistory</code> class:</p>
      <ul>
        <li><code>BrowserHistory(string homepage)</code>: Initializes the object with the <code>homepage</code>.</li>
        <li><code>void visit(string url)</code>: Visits <code>url</code> from the current page. Clears all forward history.</li>
        <li><code>string back(int steps)</code>: Move <code>steps</code> back in history. Returns the current <code>url</code>.</li>
        <li><code>string forward(int steps)</code>: Move <code>steps</code> forward in history. Returns the current <code>url</code>.</li>
      </ul>
      
      <h5>Example 1:</h5>
      <pre>
<strong>Input:</strong>
["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"]
[["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]
<strong>Output:</strong>
[null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]
      </pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= homepage.length, url.length <= 20</code></li>
        <li><code>1 <= steps <= 100</code></li>
        <li>URLs consist of lowercase letters and <code>'.'</code>.</li>
        <li>At most <code>5000</code> calls to <code>visit</code>, <code>back</code>, and <code>forward</code>.</li>
      </ul>
    `,
    starterCode: `class BrowserHistory:
    def __init__(self, homepage: str):
        pass

    def visit(self, url: str) -> None:
        pass

    def back(self, steps: int) -> str:
        return ""

    def forward(self, steps: int) -> str:
        return ""`,
    testCases: [
      {
        input: '{"commands": ["BrowserHistory", "visit", "visit", "visit", "back", "back", "forward", "visit", "forward", "back", "back"], "arguments": [["leetcode.com"], ["google.com"], ["facebook.com"], ["youtube.com"], [1], [1], [1], ["linkedin.com"], [2], [2], [7]]}',
        expected: [null, null, null, null, "facebook.com", "google.com", "facebook.com", null, "linkedin.com", "google.com", "leetcode.com"]
      }
    ],
    explanation: `
      <h4>Simple List or Two Stacks</h4>
      <p>Use a dynamic list and a pointer tracks the current history index, truncating elements on new visits.</p>
    `,
    followUps: [
      "Compare the memory layout of the dynamic array vs doubly linked list solution.",
      "How would you scale this to support tab structures?"
    ]
  },
  {
    id: "design-file-system",
    title: "1166. Design File System",
    difficulty: "Medium",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/design-file-system/",
    entryPoint: "FileSystem",
    isClassDesign: true,
    className: "FileSystem",
    companyTags: ["Google", "Amazon"],
    description: `
      <p>Design a file system that allows you to create new paths and associate them with different values.</p>
      <p>The path format is a string starting with <code>/</code> followed by one or more lowercase English letters split by <code>/</code>.</p>
      <p>Implement the <code>FileSystem</code> class:</p>
      <ul>
        <li><code>bool createPath(string path, int value)</code>: Creates a new path and associates a <code>value</code> to it if possible. Returns <code>true</code>. Returns <code>false</code> if path already exists or parent does not exist.</li>
        <li><code>int get(string path)</code>: Returns the value associated with <code>path</code> or returns <code>-1</code>.</li>
      </ul>
      
      <h5>Example 1:</h5>
      <pre>
FileSystem fileSystem = new FileSystem();
fileSystem.createPath("/a", 1); // returns true
fileSystem.get("/a"); // returns 1
      </pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>2 <= path.length <= 100</code></li>
        <li><code>1 <= value <= 10<sup>9</sup></code></li>
        <li>At most <code>10<sup>4</sup></code> calls will be made to <code>createPath</code> and <code>get</code>.</li>
      </ul>
    `,
    starterCode: `class FileSystem:
    def __init__(self):
        pass

    def createPath(self, path: str, value: int) -> bool:
        return False

    def get(self, path: str) -> int:
        return -1`,
    testCases: [
      {
        input: '{"commands": ["FileSystem", "createPath", "get"], "arguments": [[], ["/a", 1], ["/a"]]}',
        expected: [null, true, 1]
      },
      {
        input: '{"commands": ["FileSystem", "createPath", "createPath", "get", "createPath", "get"], "arguments": [[], ["/leet", 1], ["/leet/code", 2], ["/leet/code"], ["/c/d", 1], ["/c"]]}',
        expected: [null, true, true, 2, false, -1]
      }
    ],
    explanation: `
      <h4>Trie or Hash Map Lookup</h4>
      <p>A Trie structure naturally models path hierarchies. Simple hash maps can verify if parent paths exist first.</p>
    `,
    followUps: [
      "What are the pros and cons of using a Trie vs a flat Hash Map?",
      "How do we handle concurrent writes to the file system?"
    ]
  },
  {
    id: "time-map",
    title: "981. Time Based Key-Value Store",
    difficulty: "Medium",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/time-based-key-value-store/",
    entryPoint: "TimeMap",
    isClassDesign: true,
    className: "TimeMap",
    companyTags: ["Google", "Netflix", "Amazon"],
    description: `
      <p>Design a time-based key-value data store that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.</p>
      <p>Implement the <code>TimeMap</code> class:</p>
      <ul>
        <li><code>void set(string key, string value, int timestamp)</code>: Stores key-value at timestamp.</li>
        <li><code>string get(string key, int timestamp)</code>: Returns value associated with largest <code>timestamp_prev <= timestamp</code>. Returns <code>""</code> if none exist.</li>
      </ul>
      
      <h5>Example 1:</h5>
      <pre>
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value store for timestamp 3, largest is timestamp 1.
timeMap.set("foo", "bar2", 4); // store key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
      </pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= key.length, value.length <= 100</code></li>
        <li><code>1 <= timestamp <= 10<sup>7</sup></code></li>
        <li>All the timestamps in <code>set</code> are strictly increasing.</li>
      </ul>
    `,
    starterCode: `class TimeMap:
    def __init__(self):
        pass

    def set(self, key: str, value: str, timestamp: int) -> None:
        pass

    def get(self, key: str, timestamp: int) -> str:
        return ""`,
    testCases: [
      {
        input: '{"commands": ["TimeMap", "set", "get", "get", "set", "get", "get"], "arguments": [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]}',
        expected: [null, null, "bar", "bar", null, "bar2", "bar2"]
      }
    ],
    explanation: `
      <h4>Hash Map + Binary Search (Bisect)</h4>
      <p>For each key, store a list of <code>(timestamp, value)</code> tuples. Use binary search (<code>bisect</code>) to lookup values in <code>get()</code>.</p>
    `,
    followUps: [
      "What Python module performs binary search on lists?",
      "How would you handle duplicate timestamps?"
    ]
  },
  {
    id: "design-twitter",
    title: "355. Design Twitter",
    difficulty: "Medium",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/design-twitter/",
    entryPoint: "Twitter",
    isClassDesign: true,
    className: "Twitter",
    companyTags: ["Twitter", "Google", "Amazon"],
    description: `
      <p>Design a simplified version of Twitter where users can post tweets, follow/unfollow other users, and see the 10 most recent tweets in their news feed.</p>
      <p>Implement the <code>Twitter</code> class:</p>
      <ul>
        <li><code>void postTweet(int userId, int tweetId)</code>: Composes a new tweet.</li>
        <li><code>List[int] getNewsFeed(int userId)</code>: Retrieves the 10 most recent tweet IDs in news feed from followed users or self, ordered from most recent to least recent.</li>
        <li><code>void follow(int followerId, int followeeId)</code>: Follows a user.</li>
        <li><code>void unfollow(int followerId, int followeeId)</code>: Unfollows a user.</li>
      </ul>

      <h5>Example 1:</h5>
      <pre>
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
twitter.getNewsFeed(1);  // User 1's news feed should return [5].
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(1);  // User 1's news feed should return [6, 5].
twitter.unfollow(1, 2);  // User 1 unfollows user 2.
twitter.getNewsFeed(1);  // User 1's news feed should return [5].
      </pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= userId, followerId, followeeId <= 500</code></li>
        <li><code>0 <= tweetId <= 10<sup>4</sup></code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Twitter:
    def __init__(self):
        pass

    def postTweet(self, userId: int, tweetId: int) -> None:
        pass

    def getNewsFeed(self, userId: int) -> List[int]:
        return []

    def follow(self, followerId: int, followeeId: int) -> None:
        pass

    def unfollow(self, followerId: int, followeeId: int) -> None:
        pass`,
    testCases: [
      {
        input: '{"commands": ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"], "arguments": [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]}',
        expected: [null, null, [5], null, null, [6, 5], null, [5]]
      }
    ],
    explanation: `
      <h4>Heaps for Feed Merging</h4>
      <p>Map users to sets of followees. Store lists of tweets. Query feeds by merging followee tweet lists using a Heap.</p>
    `,
    followUps: [
      "How would this scale if a user has millions of followers (celebrity problem)?",
      "Is it better to pull tweets dynamically (Pull model) or push tweets to active feeds (Push model)?"
    ]
  },
  {
    id: "basic-calculator-i",
    title: "224. Basic Calculator",
    difficulty: "Hard",
    category: "Stack & Parsers",
    leetcodeLink: "https://leetcode.com/problems/basic-calculator/",
    entryPoint: "calculate",
    companyTags: ["Google", "Meta", "Amazon"],
    description: `
      <p>Given a string <code>s</code> representing a valid expression, implement a basic calculator to evaluate it, and return <em>the result of the evaluation</em>.</p>
      <p><strong>Note:</strong> You are not allowed to use any built-in function which evaluates strings as code, such as <code>eval()</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> s = "1 + 1"\n<strong>Output:</strong> 2</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> s = " 2-1 + 2 "\n<strong>Output:</strong> 3</pre>
      
      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> s = "(1+(4+5+2)-3)+(6+8)"\n<strong>Output:</strong> 23</pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= s.length <= 3 * 10<sup>5</sup></code></li>
        <li><code>s</code> consists of digits, <code>'+'</code>, <code>'-'</code>, <code>'('</code>, <code>')'</code>, and <code>' '</code>.</li>
        <li><code>s</code> represents a valid expression.</li>
        <li>Every number and running calculation will fit in a signed 32-bit integer.</li>
      </ul>
    `,
    starterCode: `class Solution:
    def calculate(self, s: str) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '["1 + 1"]', expected: 2 },
      { input: '[" 2-1 + 2 "]', expected: 3 },
      { input: '["(1+(4+5+2)-3)+(6+8)"]', expected: 23 },
      { input: '["-2 + 1"]', expected: -1, hidden: true }
    ],
    explanation: `
      <h4>Recursion / Stack Sum</h4>
      <p>Iterate through string. Keep track of running sum and sign. Push state (sum, sign) onto stack when seeing <code>(</code>.</p>
    `,
    followUps: [
      "Can we handle multiplication and division inside the same stack?",
      "Explain how to clean strings with leading unary minus signs."
    ]
  },
  {
    id: "basic-calculator-ii",
    title: "227. Basic Calculator II",
    difficulty: "Medium",
    category: "Stack & Parsers",
    leetcodeLink: "https://leetcode.com/problems/basic-calculator-ii/",
    entryPoint: "calculate",
    companyTags: ["Amazon", "Meta", "Microsoft"],
    description: `
      <p>Given a string <code>s</code> which represents an expression, evaluate this expression and return its value.</p>
      <p>The integer division should truncate toward zero.</p>
      <p><strong>Note:</strong> You are not allowed to use any built-in function which evaluates strings as code, such as <code>eval()</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> s = "3+2*2"\n<strong>Output:</strong> 7</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> s = " 3/2 "\n<strong>Output:</strong> 1</pre>
      
      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> s = " 3+5 / 2 "\n<strong>Output:</strong> 5</pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= s.length <= 3 * 10<sup>5</sup></code></li>
        <li><code>s</code> consists of integers and operators (<code>'+'</code>, <code>'-'</code>, <code>'*'</code>, <code>'/'</code>) separated by some spaces.</li>
        <li>All the integers in the expression are non-negative in range <code>[0, 2<sup>31</sup> - 1]</code>.</li>
      </ul>
    `,
    starterCode: `class Solution:
    def calculate(self, s: str) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '["3+2*2"]', expected: 7 },
      { input: '[" 3/2 "]', expected: 1 },
      { input: '[" 3+5 / 2 "]', expected: 5 }
    ],
    explanation: `
      <h4>Stack Accumulation of Terms</h4>
      <p>Iterate and extract numbers. When seeing * or /, pop last, evaluate, and push back. Sum stack at end.</p>
    `,
    followUps: [
      "Can we solve this in O(1) extra space without using a stack?",
      "How do we handle negative numbers in Python integer division truncation?"
    ]
  },
  {
    id: "basic-calculator-iii",
    title: "772. Basic Calculator III",
    difficulty: "Hard",
    category: "Stack & Parsers",
    leetcodeLink: "https://leetcode.com/problems/basic-calculator-iii/",
    entryPoint: "calculate",
    companyTags: ["Google", "Amazon"],
    description: `
      <p>Implement a basic calculator evaluating strings with non-negative integers, <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and parentheses <code>(</code>, <code>)</code>. The integer division should truncate toward zero.</p>
      <p><strong>Note:</strong> You are not allowed to use any built-in function which evaluates strings as code, such as <code>eval()</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> s = "1+1"\n<strong>Output:</strong> 2</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> s = "6-4/2"\n<strong>Output:</strong> 4</pre>
      
      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> s = "2*(5+5*2)/3+(6/2+8)"\n<strong>Output:</strong> 21</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= s.length <= 10<sup>4</sup></code></li>
        <li><code>s</code> consists of digits, operators, and parentheses.</li>
      </ul>
    `,
    starterCode: `class Solution:
    def calculate(self, s: str) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '["2*(5+5*2)/3+(6/2+8)"]', expected: 21 },
      { input: '["1+1"]', expected: 2 },
      { input: '["0"]', expected: 0, hidden: true }
    ],
    explanation: `
      <h4>Recursion or Shunting-Yard</h4>
      <p>Combine recursive evaluation (for parentheses) with precedence stack (for * and /).</p>
    `,
    followUps: [
      "Compare recursion depth cost vs Shunting-Yard operator stacks.",
      "How would you evaluate exponential operators?"
    ]
  },
  {
    id: "evaluate-reverse-polish-notation",
    title: "150. Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "Stack & Parsers",
    leetcodeLink: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    entryPoint: "evalRPN",
    companyTags: ["Google", "Amazon", "LinkedIn"],
    description: `
      <p>You are given an array of strings <code>tokens</code> that represents an arithmetic expression in a <a href="http://en.wikipedia.org/wiki/Reverse_Polish_notation" target="_blank">Reverse Polish Notation</a>.</p>
      <p>Evaluate the expression. Return <em>an integer that represents the value of the expression</em>.</p>
      <p>Note that:</p>
      <ul>
        <li>The valid operators are <code>'+'</code>, <code>'-'</code>, <code>'*'</code>, and <code>'/'</code>.</li>
        <li>Each operand may be an integer or another expression.</li>
        <li>The division between two integers always truncates toward zero.</li>
      </ul>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> tokens = ["2","1","+","3","*"]\n<strong>Output:</strong> 9\n<strong>Explanation:</strong> ((2 + 1) * 3) = 9</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> tokens = ["4","13","5","/","+"]\n<strong>Output:</strong> 6\n<strong>Explanation:</strong> (4 + (13 / 5)) = 6</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= tokens.length <= 10<sup>4</sup></code></li>
        <li><code>tokens[i]</code> is either an operator or an integer in range <code>[-200, 200]</code>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[["2","1","+","3","*"]]', expected: 9 },
      { input: '[["4","13","5","/","+"]]', expected: 6 }
    ],
    explanation: `
      <h4>Stack Postfix Evaluation</h4>
      <p>Scan left-to-right. Push numbers. Pop two numbers and evaluate when seeing operator.</p>
    `,
    followUps: [
      "Why is RPN notation easier for computers to parse compared to infix notation?",
      "How do you handle division truncation towards zero for negative numbers in Python?"
    ]
  },
  {
    id: "decode-string",
    title: "394. Decode String",
    difficulty: "Medium",
    category: "Stack & Parsers",
    leetcodeLink: "https://leetcode.com/problems/decode-string/",
    entryPoint: "decodeString",
    companyTags: ["Google", "Meta", "Bloomberg"],
    description: `
      <p>Given an encoded string, return its decoded string.</p>
      <p>The encoding rule is: <code>k[encoded_string]</code>, where the <code>encoded_string</code> inside the square brackets is being repeated exactly <code>k</code> times. Note that <code>k</code> is guaranteed to be a positive integer.</p>
      <p>You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, <code>k</code>. For example, there will not be input like <code>3a</code> or <code>2[4]</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> s = "3[a]2[bc]"\n<strong>Output:</strong> "aaabcbc"</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> s = "3[a2[c]]"\n<strong>Output:</strong> "accaccacc"</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= s.length <= 30</code></li>
        <li><code>s</code> consists of lowercase English letters, digits, and square brackets.</li>
      </ul>
    `,
    starterCode: `class Solution:
    def decodeString(self, s: str) -> str:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '["3[a]2[bc]"]', expected: "aaabcbc" },
      { input: '["3[a2[c]]"]', expected: "accaccacc" },
      { input: '["2[abc]3[cd]ef"]', expected: "abcabccdcdcdef" }
    ],
    explanation: `
      <h4>Stack or Recursive Decoders</h4>
      <p>Use a stack to store previous string buffers and multipliers. Push on [ and resolve repetition on ].</p>
    `,
    followUps: [
      "Can we solve this using regular expressions in Python? What are the limitations?",
      "What is the maximum space complexity if the nesting level is deep?"
    ]
  },
  {
    id: "mini-parser",
    title: "385. Mini Parser",
    difficulty: "Medium",
    category: "Stack & Parsers",
    leetcodeLink: "https://leetcode.com/problems/mini-parser/",
    entryPoint: "deserialize",
    companyTags: ["Google", "Bloomberg"],
    description: `
      <p>Given a string <code>s</code> representing the serialization of a nested list, implement a parser to deserialize it and return a <code>NestedInteger</code>.</p>
      <p>Each element is either an integer or a list whose elements may also be integers or other lists.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> s = "324"\n<strong>Output:</strong> 324\n<strong>Explanation:</strong> You should return a NestedInteger object which contains a single integer 324.</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> s = "[123,[456,[789]]]"\n<strong>Output:</strong> [123,[456,[789]]]\n<strong>Explanation:</strong> Return a NestedInteger object containing a nested list with 2 elements.</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= s.length <= 5 * 10<sup>4</sup></code></li>
        <li><code>s</code> consists of digits, <code>'-'</code>, <code>'['</code>, <code>']'</code>, and <code>','</code>.</li>
      </ul>
    `,
    starterCode: `# class NestedInteger:
#     def __init__(self, value=None):
#         pass
#     def isInteger(self):
#         pass
#     def getInteger(self):
#         pass
#     def setInteger(self, value):
#         pass
#     def add(self, elem):
#         pass
#     def getList(self):
#         pass

class Solution:
    def deserialize(self, s: str) -> 'NestedInteger':
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '["324"]', expected: 324 },
      { input: '["[123,[456,[789]]]"]', expected: [123,[456,[789]]] }
    ],
    explanation: `
      <h4>Stack Parsing of Nested Structs</h4>
      <p>Use a stack. When seeing '[', push a new NestedInteger. Accumulate digits for integers. Append to parent on ',' or ']'.</p>
    `,
    followUps: [
      "What is the worst-case space complexity of your stack parser?",
      "How would you write a serializer function that outputs the string back?"
    ]
  },
  {
    id: "detonate-the-maximum-bombs",
    title: "2101. Detonate the Maximum Bombs",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/detonate-the-maximum-bombs/",
    entryPoint: "maximumDetonation",
    companyTags: ["Google", "Amazon", "Meta"],
    description: `
      <p>You are given a list of bombs. The locations of the bombs are represented by a 0-indexed 2D integer array <code>bombs</code> where <code>bombs[i] = [xi, yi, ri]</code>. <code>xi</code> and <code>yi</code> denote the X-coordinate and Y-coordinate of the <code>i<sup>th</sup></code> bomb, and <code>ri</code> denotes the <strong>radius</strong> of its blast.</p>
      <p>You may choose to detonate a <strong>single</strong> bomb. When a bomb detonates, it will detonate <strong>all bombs</strong> that lie in its area of effect. These bombs will then detonate the bombs in their areas of effect, and so on.</p>
      <p>Return <em>the <strong>maximum</strong> number of bombs that can be detonated if you trigger just <strong>one</strong> bomb</em>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> bombs = [[2,1,3],[6,1,4]]\n<strong>Output:</strong> 2\n<strong>Explanation:</strong> Bomb 0 at (2,1) with radius 3 reaches bomb 1 at (6,1) distance 4.</pre>
      
      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> bombs = [[1,1,5],[10,10,5]]\n<strong>Output:</strong> 1\n<strong>Explanation:</strong> Neither bomb can reach the other.</pre>

      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]\n<strong>Output:</strong> 5</pre>
      
      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= bombs.length <= 100</code></li>
        <li><code>bombs[i].length == 3</code></li>
        <li><code>1 <= xi, yi, ri <= 10<sup>5</sup></code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def maximumDetonation(self, bombs: List[List[int]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[[2,1,3],[6,1,4]]]', expected: 2 },
      { input: '[[[1,1,5],[10,10,5]]]', expected: 1 },
      { input: '[[[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]]', expected: 5 }
    ],
    explanation: `
      <h4>Directed Graph BFS / DFS</h4>
      <p>Construct a directed graph where directed edge <code>u -> v</code> exists if the Euclidean distance <code>(x1-x2)^2 + (y1-y2)^2 <= r1^2</code>. Perform BFS or DFS starting from each bomb node to find the maximum reachable component size.</p>
    `,
    followUps: [
      "Why is the graph directed instead of undirected?",
      "What is the time complexity of building the adjacency graph vs traversing it?"
    ]
  },
  {
    id: "minesweeper",
    title: "529. Minesweeper",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/minesweeper/",
    entryPoint: "updateBoard",
    companyTags: ["Amazon", "Uber", "Microsoft"],
    description: `
      <p>Let's play the minesweeper game!</p>
      <p>You are given an <code>m x n</code> char matrix <code>board</code> representing the game board where:</p>
      <ul>
        <li><code>'M'</code> represents an unrevealed mine,</li>
        <li><code>'E'</code> represents an unrevealed empty square,</li>
        <li><code>'B'</code> represents a revealed blank square that has no adjacent mines (in 8 directions),</li>
        <li>digit (<code>'1'</code> to <code>'8'</code>) represents how many mines are adjacent to this revealed square,</li>
        <li><code>'X'</code> represents a revealed mine.</li>
      </ul>
      <p>You are also given an array <code>click = [r, c]</code> representing the click position among all unrevealed squares (<code>'M'</code> or <code>'E'</code>).</p>
      <p>Return <em>the board after revealing this position according to Minesweeper rules</em>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]\n<strong>Output:</strong> [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]\n<strong>Output:</strong> [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>m == board.length</code>, <code>n == board[i].length</code></li>
        <li><code>1 <= m, n <= 50</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[ [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], [3,0] ]', expected: [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]] },
      { input: '[ [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], [1,2] ]', expected: [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]] }
    ],
    explanation: `
      <h4>Grid BFS / DFS Traversal</h4>
      <p>If click position is <code>'M'</code>, set to <code>'X'</code> and return. Otherwise count adjacent mines in 8 directions. If count &gt; 0, set to <code>str(count)</code>. If count == 0, set to <code>'B'</code> and recursively visit unrevealed <code>'E'</code> neighbors.</p>
    `,
    followUps: [
      "How does BFS compare with DFS for Minesweeper in terms of call stack depth?"
    ]
  },
  {
    id: "number-of-provinces",
    title: "547. Number of Provinces",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/number-of-provinces/",
    entryPoint: "findCircleNum",
    companyTags: ["Google", "Amazon", "Meta", "Microsoft"],
    description: `
      <p>There are <code>n</code> cities. Some of them are connected directly or indirectly. A <strong>province</strong> is a group of directly or indirectly connected cities.</p>
      <p>You are given an <code>n x n</code> matrix <code>isConnected</code> where <code>isConnected[i][j] = 1</code> if the <code>i<sup>th</sup></code> city and the <code>j<sup>th</sup></code> city are directly connected.</p>
      <p>Return <em>the total number of <strong>provinces</strong></em>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> isConnected = [[1,1,0],[1,1,0],[0,0,1]]\n<strong>Output:</strong> 2</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> isConnected = [[1,0,0],[0,1,0],[0,0,1]]\n<strong>Output:</strong> 3</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= n <= 200</code></li>
        <li><code>isConnected[i][j]</code> is <code>1</code> or <code>0</code>.</li>
        <li><code>isConnected[i][i] == 1</code></li>
        <li><code>isConnected[i][j] == isConnected[j][i]</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[[1,1,0],[1,1,0],[0,0,1]]]', expected: 2 },
      { input: '[[[1,0,0],[0,1,0],[0,0,1]]]', expected: 3 }
    ],
    explanation: `
      <h4>Connected Components (DFS / BFS / Union-Find)</h4>
      <p>Iterate over all cities <code>0..n-1</code> with a visited set. Whenever an unvisited city is encountered, increment province count and launch DFS/BFS to visit all connected cities.</p>
    `,
    followUps: [
      "How would Union-Find (Disjoint Set Union) compare with DFS in performance?"
    ]
  },
  {
    id: "max-area-of-island",
    title: "695. Max Area of Island",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/max-area-of-island/",
    entryPoint: "maxAreaOfIsland",
    companyTags: ["Amazon", "Google", "Meta"],
    description: `
      <p>You are given an <code>m x n</code> binary matrix <code>grid</code>. An island is a group of <code>1</code>'s (representing land) connected <strong>4-directionally</strong>.</p>
      <p>The <strong>area</strong> of an island is the number of cells with a value <code>1</code> in the island.</p>
      <p>Return <em>the maximum <strong>area</strong> of an island in </em><code>grid</code>. If there is no island, return <code>0</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]\n<strong>Output:</strong> 6</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> grid = [[0,0,0,0,0,0,0,0]]\n<strong>Output:</strong> 0</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>m == grid.length</code>, <code>n == grid[i].length</code></li>
        <li><code>1 <= m, n <= 50</code></li>
        <li><code>grid[i][j]</code> is <code>0</code> or <code>1</code>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]]', expected: 6 },
      { input: '[[[0,0,0,0,0,0,0,0]]]', expected: 0 }
    ],
    explanation: `
      <h4>Grid Connected Component Area</h4>
      <p>Traverse each cell in the grid. If a cell contains <code>1</code>, launch BFS/DFS to visit all 4-directionally connected <code>1</code>s, sink land to <code>0</code>, and count island size. Maintain max area across grid.</p>
    `,
    followUps: [
      "How can we avoid mutating the input grid matrix?"
    ]
  },
  {
    id: "rotting-oranges",
    title: "994. Rotting Oranges",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/rotting-oranges/",
    entryPoint: "orangesRotting",
    companyTags: ["Amazon", "Google", "Microsoft", "Meta"],
    description: `
      <p>You are given an <code>m x n</code> grid where each cell can have one of three values:</p>
      <ul>
        <li><code>0</code> representing an empty cell,</li>
        <li><code>1</code> representing a fresh orange, or</li>
        <li><code>2</code> representing a rotten orange.</li>
      </ul>
      <p>Every minute, any fresh orange that is <strong>4-directionally adjacent</strong> to a rotten orange becomes rotten.</p>
      <p>Return <em>the minimum number of minutes that must elapse until no cell has a fresh orange</em>. If <em>this is impossible, return <code>-1</code></em>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> grid = [[2,1,1],[1,1,0],[0,1,1]]\n<strong>Output:</strong> 4</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> grid = [[2,1,1],[0,1,1],[1,0,1]]\n<strong>Output:</strong> -1\n<strong>Explanation:</strong> Bottom-left orange cannot be reached.</pre>

      <h5>Example 3:</h5>
      <pre><strong>Input:</strong> grid = [[0,2]]\n<strong>Output:</strong> 0</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>m == grid.length</code>, <code>n == grid[i].length</code></li>
        <li><code>1 <= m, n <= 10</code></li>
        <li><code>grid[i][j]</code> is <code>0</code>, <code>1</code>, or <code>2</code>.</li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[[2,1,1],[1,1,0],[0,1,1]]]', expected: 4 },
      { input: '[[[2,1,1],[0,1,1],[1,0,1]]]', expected: -1 },
      { input: '[[[0,2]]]', expected: 0 }
    ],
    explanation: `
      <h4>Multi-Source BFS</h4>
      <p>Enqueue all initial rotten oranges (<code>2</code>) and count fresh oranges (<code>1</code>). Run level-by-level BFS. Increment minute elapsed per level. If fresh count reaches 0, return elapsed minutes, otherwise return -1.</p>
    `,
    followUps: [
      "Why is BFS required instead of DFS for shortest-time multi-source propagation?"
    ]
  },
  {
    id: "walls-and-gates",
    title: "286. Walls and Gates",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/walls-and-gates/",
    entryPoint: "wallsAndGates",
    companyTags: ["Google", "Meta", "Amazon"],
    description: `
      <p>You are given an <code>m x n</code> grid <code>rooms</code> initialized with these three possible values:</p>
      <ul>
        <li><code>-1</code> represents a wall or an obstacle.</li>
        <li><code>0</code> represents a gate.</li>
        <li><code>INF = 2147483647</code> represents an empty room.</li>
      </ul>
      <p>Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with <code>INF</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]\n<strong>Output:</strong> [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>m == rooms.length</code>, <code>n == rooms[i].length</code></li>
        <li><code>1 <= m, n <= 250</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> None:
        """
        Do not return anything, modify rooms in-place instead.
        """
        pass`,
    testCases: [
      { input: '[[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]]', expected: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]] }
    ],
    explanation: `
      <h4>Multi-Source BFS</h4>
      <p>Push all gate coordinates <code>(r, c)</code> into a queue. Perform BFS simultaneously from all gates, filling empty rooms with their shortest distance level by level.</p>
    `,
    followUps: [
      "Why is multi-source BFS better than running BFS from each empty room independently?"
    ]
  },
  {
    id: "battleships-in-a-board",
    title: "419. Battleships in a Board",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/battleships-in-a-board/",
    entryPoint: "countBattleships",
    companyTags: ["Microsoft", "Google"],
    description: `
      <p>Given an <code>m x n</code> matrix <code>board</code> where each cell is a battleship <code>'X'</code> or empty <code>'.'</code>, return <em>the number of the <strong>battleships</strong> on <code>board</code></em>.</p>
      <p>Battleships can only be placed horizontally or vertically on <code>board</code>. Battleships cannot overlap or be adjacent to each other.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]\n<strong>Output:</strong> 2</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>m == board.length</code>, <code>n == board[i].length</code></li>
        <li><code>1 <= m, n <= 200</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def countBattleships(self, board: List[List[str]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[ [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]] ]', expected: 2 },
      { input: '[ [["."]] ]', expected: 0 }
    ],
    explanation: `
      <h4>One-Pass O(1) Extra Space Counting</h4>
      <p>Count top-left corner cells of each battleship. A cell <code>(r, c) == 'X'</code> is a head if <code>r == 0</code> or <code>board[r-1][c] == '.'</code> AND <code>c == 0</code> or <code>board[r][c-1] == '.'</code>.</p>
    `,
    followUps: [
      "Can you solve this in O(1) memory without mutating the input matrix?"
    ]
  },
  {
    id: "escape-the-spreading-fire",
    title: "2258. Escape the Spreading Fire",
    difficulty: "Hard",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/escape-the-spreading-fire/",
    entryPoint: "maximumMinutes",
    companyTags: ["Google", "Amazon"],
    description: `
      <p>You are given a 0-indexed 2D integer array <code>grid</code> where <code>0</code> represents grass, <code>1</code> fire, and <code>2</code> a wall. Every minute fire spreads to 4-directionally adjacent grass cells. You start at <code>(0,0)</code> and want to reach <code>(m-1, n-1)</code> safely.</p>
      <p>Return <em>the maximum number of minutes you can stay at <code>(0,0)</code> before moving and still reach the destination</em>. Return <code>10<sup>9</sup></code> if safe indefinitely, or <code>-1</code> if impossible.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> grid = [[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,0,0],[0,0,0,0,2,2,0],[0,0,0,0,0,0,0]]\n<strong>Output:</strong> 3</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>m == grid.length</code>, <code>n == grid[i].length</code></li>
        <li><code>2 <= m, n <= 300</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def maximumMinutes(self, grid: List[List[int]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,0,0],[0,0,0,0,2,2,0],[0,0,0,0,0,0,0]]]', expected: 3 }
    ],
    explanation: `
      <h4>Multi-Source BFS + Binary Search</h4>
      <p>1. Run Multi-Source BFS to compute fire arrival time for every cell.</p>
      <p>2. Binary Search or compute human arrival time to check if destination can be reached before fire arrives.</p>
    `,
    followUps: [
      "What is the edge case when both human and fire reach the bottom-right safehouse at the exact same minute?"
    ]
  },
  {
    id: "number-of-connected-components-in-an-undirected-graph",
    title: "323. Number of Connected Components in an Undirected Graph",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    entryPoint: "countComponents",
    companyTags: ["Amazon", "Google", "Meta", "LinkedIn"],
    description: `
      <p>You have a graph of <code>n</code> nodes. You are given an integer <code>n</code> and an array <code>edges</code> where <code>edges[i] = [ai, bi]</code> indicates that there is an edge between <code>ai</code> and <code>bi</code> in the graph.</p>
      <p>Return <em>the number of connected components in the graph</em>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> n = 5, edges = [[0,1],[1,2],[3,4]]\n<strong>Output:</strong> 2</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]\n<strong>Output:</strong> 1</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= n <= 2000</code></li>
        <li><code>0 <= edges.length <= 5000</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[5, [[0,1],[1,2],[3,4]]]', expected: 2 },
      { input: '[5, [[0,1],[1,2],[2,3],[3,4]]]', expected: 1 }
    ],
    explanation: `
      <h4>Union-Find (DSU) or BFS/DFS</h4>
      <p>Initialize DSU with <code>n</code> components. For each edge <code>(u, v)</code>, union the sets. If union succeeds, decrement component count.</p>
    `,
    followUps: [
      "Compare space & time complexity of Union-Find with Path Compression vs BFS graph traversal."
    ]
  },
  {
    id: "word-ladder",
    title: "127. Word Ladder",
    difficulty: "Hard",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/word-ladder/",
    entryPoint: "ladderLength",
    companyTags: ["Amazon", "Google", "Meta", "Microsoft"],
    description: `
      <p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -> s1 -> s2 -> ... -> sk</code> such that every adjacent pair differs by single letter and <code>sk == endWord</code>.</p>
      <p>Given <code>beginWord</code>, <code>endWord</code>, and <code>wordList</code>, return <em>the <strong>number of words</strong> in the shortest transformation sequence, or <code>0</code> if no sequence exists</em>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]\n<strong>Output:</strong> 5\n<strong>Explanation:</strong> "hit" -> "hot" -> "dot" -> "dog" -> "cog".</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]\n<strong>Output:</strong> 0</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= beginWord.length <= 10</code></li>
        <li><code>1 <= wordList.length <= 5000</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '["hit", "cog", ["hot","dot","dog","lot","log","cog"]]', expected: 5 },
      { input: '["hit", "cog", ["hot","dot","dog","lot","log"]]', expected: 0 }
    ],
    explanation: `
      <h4>Unweighted Shortest Path BFS</h4>
      <p>Build wildcard pattern mapping (e.g. <code>*ot -> hot, dot, lot</code>). Perform BFS level-by-level starting from <code>beginWord</code> until reaching <code>endWord</code>.</p>
    `,
    followUps: [
      "How can Bidirectional BFS optimize search space for long word ladders?"
    ]
  },
  {
    id: "redundant-connection",
    title: "684. Redundant Connection",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/redundant-connection/",
    entryPoint: "findRedundantConnection",
    companyTags: ["Google", "Amazon", "Meta"],
    description: `
      <p>In this problem, a tree is an undirected graph that is connected and has no cycles.</p>
      <p>You are given a graph that started as a tree with <code>n</code> nodes labeled from <code>1</code> to <code>n</code>, with one additional edge added.</p>
      <p>Return <em>an edge that can be removed so that the resulting graph is a tree of <code>n</code> nodes</em>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> edges = [[1,2],[1,3],[2,3]]\n<strong>Output:</strong> [2,3]</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]\n<strong>Output:</strong> [1,4]</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>n == edges.length</code></li>
        <li><code>3 <= n <= 1000</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[[1,2],[1,3],[2,3]]]', expected: [2,3] },
      { input: '[[[1,2],[2,3],[3,4],[1,4],[1,5]]]', expected: [1,4] }
    ],
    explanation: `
      <h4>Union-Find Cycle Detection</h4>
      <p>Process edges sequentially in Disjoint Set Union (DSU). If <code>find(u) == find(v)</code>, edge <code>(u, v)</code> forms a cycle and is the redundant connection.</p>
    `,
    followUps: [
      "Why does DSU find the exact edge causing the cycle in a single pass?"
    ]
  },
  {
    id: "accounts-merge",
    title: "721. Accounts Merge",
    difficulty: "Medium",
    category: "Graphs & BFS/DFS",
    leetcodeLink: "https://leetcode.com/problems/accounts-merge/",
    entryPoint: "accountsMerge",
    companyTags: ["Meta", "Google", "Amazon"],
    description: `
      <p>Given a list of <code>accounts</code> where <code>accounts[i][0]</code> is a name, and rest are emails.</p>
      <p>Merge accounts that share common emails. Return accounts in format: name followed by sorted emails.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]\n<strong>Output:</strong> [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]</pre>

      <h5>Constraints:</h5>
      <ul>
        <li><code>1 <= accounts.length <= 1000</code></li>
      </ul>
    `,
    starterCode: `from typing import List

class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[ [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]] ]', expected: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]] }
    ],
    explanation: `
      <h4>Graph Component Search / DSU</h4>
      <p>Connect first email of each account to all other emails in the same account. Use BFS/DFS or DSU to find connected components of emails, then pair with owner name.</p>
    `,
    followUps: [
      "How do we handle two different people having the exact same name?"
    ]
  },
  {
    id: "implement-trie-prefix-tree",
    title: "208. Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    entryPoint: "Trie",
    isClassDesign: true,
    className: "Trie",
    companyTags: ["Google", "Amazon", "Meta", "Twitter"],
    description: `
      <p>Implement the <code>Trie</code> class:</p>
      <ul>
        <li><code>Trie()</code> Initializes the trie object.</li>
        <li><code>void insert(String word)</code> Inserts string <code>word</code> into trie.</li>
        <li><code>boolean search(String word)</code> Returns <code>true</code> if <code>word</code> is in trie.</li>
        <li><code>boolean startsWith(String prefix)</code> Returns <code>true</code> if any inserted word starts with <code>prefix</code>.</li>
      </ul>
      
      <h5>Example 1:</h5>
      <pre><strong>Input</strong>\n["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]\n<strong>Output</strong>\n[null, null, true, false, true, null, true]</pre>
    `,
    starterCode: `class Trie:
    def __init__(self):
        pass

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def startsWith(self, prefix: str) -> bool:
        pass`,
    testCases: [
      { input: '[["Trie", "insert", "search", "search", "startsWith", "insert", "search"], [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]]', expected: [null, null, true, false, true, null, true] }
    ],
    explanation: `
      <h4>Tree of Character Map Nodes</h4>
      <p>Each <code>TrieNode</code> contains a dictionary <code>children</code> mapping characters to child nodes, and a boolean <code>is_end</code>.</p>
    `,
    followUps: [
      "Compare memory footprint of Trie vs Hash Set for long dictionary lookups."
    ]
  },
  {
    id: "find-median-from-data-stream",
    title: "295. Find Median from Data Stream",
    difficulty: "Hard",
    category: "Data Structure Design",
    leetcodeLink: "https://leetcode.com/problems/find-median-from-data-stream/",
    entryPoint: "MedianFinder",
    isClassDesign: true,
    className: "MedianFinder",
    companyTags: ["Google", "Amazon", "Meta", "Apple"],
    description: `
      <p>Implement the <code>MedianFinder</code> class:</p>
      <ul>
        <li><code>MedianFinder()</code> initializes object.</li>
        <li><code>void addNum(int num)</code> adds integer <code>num</code> from stream.</li>
        <li><code>double findMedian()</code> returns median of all elements so far.</li>
      </ul>
      
      <h5>Example 1:</h5>
      <pre><strong>Input</strong>\n["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]\n<strong>Output</strong>\n[null, null, null, 1.5, null, 2.0]</pre>
    `,
    starterCode: `class MedianFinder:
    def __init__(self):
        pass

    def addNum(self, num: int) -> None:
        pass

    def findMedian(self) -> float:
        pass`,
    testCases: [
      { input: '[["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"], [[], [1], [2], [], [3], []]]', expected: [null, null, null, 1.5, null, 2.0] }
    ],
    explanation: `
      <h4>Two Heaps (Max-Heap + Min-Heap)</h4>
      <p>Maintain max-heap for lower half and min-heap for upper half. Balance sizes so max-heap has at most 1 extra element. Median is top of max-heap or average of both tops.</p>
    `,
    followUps: [
      "If 99% of stream integers are between 0 and 100, how can bucket arrays optimize memory?"
    ]
  },
  {
    id: "lowest-common-ancestor-of-a-binary-tree",
    title: "236. Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    category: "Trees & Graphs",
    leetcodeLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    entryPoint: "lowestCommonAncestor",
    companyTags: ["Meta", "Amazon", "Google", "Microsoft"],
    description: `
      <p>Given a binary tree, find the lowest common ancestor (LCA) of two given nodes <code>p</code> and <code>q</code>.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\n<strong>Output:</strong> 3</pre>

      <h5>Example 2:</h5>
      <pre><strong>Input:</strong> root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4\n<strong>Output:</strong> 5</pre>
    `,
    starterCode: `# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # Write your Python solution here
        pass`,
    testCases: [
      { input: '[[3,5,1,6,2,0,8,null,null,7,4], 5, 1]', expected: 3 },
      { input: '[[3,5,1,6,2,0,8,null,null,7,4], 5, 4]', expected: 5 }
    ],
    explanation: `
      <h4>Post-Order Tree Traversal Recursion</h4>
      <p>If current node is <code>None</code>, <code>p</code>, or <code>q</code>, return root. Recursively search left and right. If both return non-null, current node is LCA!</p>
    `,
    followUps: [
      "How would the algorithm change if parent pointers were available on each node?"
    ]
  },
  {
    id: "serialize-and-deserialize-binary-tree",
    title: "297. Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "Trees & Graphs",
    leetcodeLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    entryPoint: "Codec",
    isClassDesign: true,
    className: "Codec",
    companyTags: ["Amazon", "Google", "Meta", "Microsoft"],
    description: `
      <p>Design an algorithm to serialize a binary tree to a string and deserialize the string back to the original tree structure.</p>
      
      <h5>Example 1:</h5>
      <pre><strong>Input:</strong> root = [1,2,3,null,null,4,5]\n<strong>Output:</strong> [1,2,3,null,null,4,5]</pre>
    `,
    starterCode: `# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string."""
        pass

    def deserialize(self, data):
        """Decodes your encoded data to tree."""
        pass`,
    testCases: [
      { input: '[["Codec", "serialize", "deserialize"], [[], [1,2,3,null,null,4,5], "[1,2,3,null,null,4,5]"]]', expected: [null, "[1,2,3,null,null,4,5]", [1,2,3,null,null,4,5]] }
    ],
    explanation: `
      <h4>Preorder Traversal or Level-Order BFS</h4>
      <p>Serialize: Traverse tree appending node values and <code>"null"</code> markers. Deserialize: Parse tokens sequentially using recursion iterator or queue.</p>
    `,
    followUps: [
      "Compare compact binary encoding vs string token serialization."
    ]
  }
];

// Helper to get all favorites
function getFavorites() {
    try {
        const stored = localStorage.getItem("favorite_problems");
        if (stored) return JSON.parse(stored);
        return ["number-of-islands", "rotting-oranges", "word-ladder", "lru-cache"];
    } catch (e) {
        console.error("Error reading favorite problems", e);
        return ["number-of-islands", "rotting-oranges", "word-ladder", "lru-cache"];
    }
}

// Helper to check if a problem is favorited
function isFavorite(problemId) {
    const favs = getFavorites();
    return favs.includes(problemId);
}

// Helper to toggle favorite status
function toggleFavorite(problemId) {
    try {
        let favs = getFavorites();
        if (favs.includes(problemId)) {
            favs = favs.filter(id => id !== problemId);
        } else {
            favs.push(problemId);
        }
        localStorage.setItem("favorite_problems", JSON.stringify(favs));
        return favs.includes(problemId);
    } catch (e) {
        console.error("Error updating favorite status", e);
        return false;
    }
}

// Helper to get all problems
function getProblems() {
    let customProblems = [];
    try {
        const stored = localStorage.getItem("custom_problems");
        if (stored) {
            customProblems = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Error reading custom problems", e);
    }
    return [...defaultProblems, ...customProblems];
}

// Helper to save a new custom problem
function addCustomProblem(problem) {
    try {
        let custom = [];
        const stored = localStorage.getItem("custom_problems");
        if (stored) {
            custom = JSON.parse(stored);
        }
        custom = custom.filter(p => p.id !== problem.id);
        custom.push(problem);
        localStorage.setItem("custom_problems", JSON.stringify(custom));
        return true;
    } catch (e) {
        console.error("Error saving custom problem", e);
        return false;
    }
}

window.getFavorites = getFavorites;
window.isFavorite = isFavorite;
window.toggleFavorite = toggleFavorite;
window.getProblems = getProblems;
window.addCustomProblem = addCustomProblem;
window.problems = getProblems();


