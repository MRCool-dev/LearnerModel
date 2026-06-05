import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import Tip from "../primitives/Tip";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";
import TestRunnerLiveDemo from "../demos/TestRunnerLiveDemo";

export default function SectionJest() {
  const [tab, setTab] = useState("basics");
  const tabs = [
    { id: "basics", label: "📝 Basics" },
    { id: "matchers", label: "✅ Matchers" },
    { id: "mocking", label: "🎭 Mocking" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>Jest is the most popular JavaScript testing framework. It works out of the box with zero configuration and provides everything you need: test running, assertions, mocking, and coverage.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#f43f5e22" : "transparent", border: `1px solid ${tab === t.id ? "#f43f5e" : D.outline}`, color: tab === t.id ? "#f43f5e" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "basics" && (
        <div>
          <CodeBlock label="first Jest test" code={`// math.js
const add = (a, b) => a + b;
const divide = (a, b) => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
};
module.exports = { add, divide };

// math.test.js
const { add, divide } = require('./math');

describe('math', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('throws on divide by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });
});`} />
          <CodeBlock label="run tests" code={`npx jest                    # run all tests once
npx jest --watch            # watch mode — rerun on file change
npx jest --coverage         # generate coverage report
npx jest math.test.js       # run single file
npx jest --testNamePattern="adds"  # run matching tests`} />
          <Tip icon="🎯" color={D.yellow} title="File naming">Jest discovers files ending in `.test.js` or `.spec.js`, and files inside `__tests__` folders. Name your tests after the file they test: `user.js` → `user.test.js`.</Tip>
        </div>
      )}
      {tab === "matchers" && (
        <div>
          <CodeBlock label="common matchers" code={`expect(value).toBe(5);                    // strict equality (===)
expect(value).toEqual({ a: 1 });          // deep equality (objects/arrays)
expect(value).toBeTruthy();               // any truthy value
expect(value).toBeNull();                 // null specifically
expect(value).toBeUndefined();            // undefined
expect(array).toContain('item');          // array contains item
expect(array).toHaveLength(3);            // array length
expect(fn).toHaveBeenCalled();            // mock was called
expect(fn).toHaveBeenCalledTimes(2);      // called exactly twice
expect(fn).toHaveBeenCalledWith('arg');   // called with specific arg
expect(promise).resolves.toBe('ok');      // async resolve
expect(promise).rejects.toThrow('err');   // async reject`} />
          <EasyBox emoji="⚠️" title="toBe vs toEqual" color={D.red}><code>toBe</code> uses <code>===</code> — it fails for objects even if they look identical: <code>expect({'{a:1}'}).toBe({'{a:1}'})</code> FAILS. Use <code>toEqual</code> for objects and arrays. Use <code>toBe</code> for primitives.</EasyBox>
        </div>
      )}
      {tab === "mocking" && (
        <div>
          <CodeBlock label="mocking with Jest" code={`// Mock a module
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: 'Alice' }))
}));

// Spy on a function
const spy = jest.spyOn(console, 'log');
myFunction();
expect(spy).toHaveBeenCalledWith('hello');
spy.mockRestore();

// Mock implementations
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockResolvedValue({ data: [] });   // for async
mockFn.mockRejectedValue(new Error('fail'));

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();  // reset call counts
});`} />
          <Tip icon="🎯" color={D.yellow} title="When to mock">Mock external dependencies (APIs, databases, file system) in unit tests. Do NOT mock the code you are testing. If you find yourself mocking everything, you are writing an integration test — use the real dependencies instead.</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="Which matcher should you use for object equality?" options={["toBe", "toEqual", "toContain", "toMatch"]} correct={1} explain="toEqual performs deep equality comparison for objects and arrays. toBe uses === which fails for objects because they have different references." />
          <QuizCard question="What does jest.fn() create?" options={["A real function", "A mock/spy function", "A test suite", "A module"]} correct={1} explain="jest.fn() creates a mock function that tracks how it was called. You can inspect calls, set return values, and verify it was invoked correctly." />
          <QuizCard question="Which command runs tests and watches for file changes?" options={["npx jest --run", "npx jest --watch", "npx jest --dev", "npx jest --live"]} correct={1} explain="npx jest --watch enters watch mode, automatically rerunning tests when files change. It's the standard workflow during development." />
        </div>
      )}
      {tab === "demo" && <TestRunnerLiveDemo />}
    </div>
  );
}
