import { useState } from "react";
import { D, mono, serif, para } from "../../tokens";
import CodeBlock from "../primitives/CodeBlock";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import Tip from "../primitives/Tip";
import QuizCard from "../primitives/QuizCard";
import CaseStudy from "../primitives/CaseStudy";
import MongoQueryDemo from "../demos/MongoQueryDemo";

export default function SectionMongoDB() {
  const [tab, setTab] = useState("documents");
  const tabs = [
    { id: "documents", label: "📄 Documents" },
    { id: "mongoose", label: "🦁 Mongoose" },
    { id: "crud", label: "📝 CRUD" },
    { id: "aggregation", label: "🔢 Aggregation" },
    { id: "indexes", label: "⚡ Indexes" },
    { id: "populate", label: "🔗 Populate" },
    { id: "hooks", label: "🪝 Hooks" },
    { id: "patterns", label: "🏗️ Patterns" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>MongoDB is the most popular NoSQL database. It stores data as flexible JSON-like documents instead of rigid tables. At 2.5 years experience, you're expected to know aggregation pipelines, indexing strategy, and Mongoose middleware deeply.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#14b8a622" : "transparent", border: `1px solid ${tab === t.id ? "#14b8a6" : D.outline}`, color: tab === t.id ? "#14b8a6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "documents" && (
        <div>
          <CodeBlock label="a MongoDB document" code={`{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  tags: ["developer", "blogger"],
  address: {
    city: "San Francisco",
    zip: "94102"
  },
  orders: [
    { product: "Laptop", price: 999, qty: 1 },
    { product: "Mouse", price: 29, qty: 2 }
  ],
  createdAt: ISODate("2024-01-15T10:30:00Z")
}`} />
          <BigIdea number="1" title="Documents are self-contained" color="#14b8a6">Unlike SQL where you need JOINs to fetch related data, MongoDB documents can embed related data directly. An order document can contain the customer info, shipping address, and line items — all in one place. One read, one document.</BigIdea>
          <BigIdea number="2" title="BSON — not just JSON" color="#3b82f6">MongoDB stores data as BSON (Binary JSON). It supports extra types that plain JSON doesn't: ObjectId, Date, Decimal128, Binary, and more. When you write JS objects, the driver automatically converts to BSON and back.</BigIdea>
          <Tip icon="🎯" color={D.yellow} title="Embed vs Reference">Embed when data is read together (user + profile). Reference when data is shared across documents (user + company). Embedding is faster to read but harder to update consistently. A document cannot exceed 16MB — embed carefully.</Tip>
        </div>
      )}
      {tab === "mongoose" && (
        <div>
          <CodeBlock label="Mongoose schema & model" code={`const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: [true, 'Name is required'], trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  age:       { type: Number, min: 0, max: 150 },
  role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive:  { type: Boolean, default: true },
  tags:      [String],
  address: {
    city:    String,
    country: { type: String, default: 'India' }
  },
  createdAt: { type: Date, default: Date.now, immutable: true }
}, {
  timestamps: true,       // auto adds createdAt, updatedAt
  toJSON: { virtuals: true }, // include virtuals when serialized
});

// Virtual — not stored in DB, computed on demand
userSchema.virtual('fullLabel').get(function() {
  return \`\${this.name} (\${this.role})\`;
});

// Instance method
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);
await mongoose.connect(process.env.MONGODB_URI);`} />
          <EasyBox emoji="🦁" title="Why Mongoose?" color="#14b8a6">Mongoose adds structure to MongoDB's flexibility. It gives you schemas, validation, middleware (pre/post hooks), virtuals, and query building. Without Mongoose, MongoDB accepts any JSON — typos in field names silently create new fields with no warning.</EasyBox>
          <CodeBlock label="schema types quick reference" code={`String, Number, Date, Buffer, Boolean, Mixed,
mongoose.Schema.Types.ObjectId,
Array (shorthand: [String], [{ type: ObjectId, ref: 'User' }]),
Map, Decimal128

// Validation
{ type: String, required: true, minlength: 3, maxlength: 50 }
{ type: String, match: /^[a-z]+$/ }
{ type: Number, validate: { validator: v => v % 2 === 0, message: 'Must be even' }}`} />
        </div>
      )}
      {tab === "crud" && (
        <div>
          <CodeBlock label="Mongoose CRUD — full patterns" code={`// CREATE — single
const user = await User.create({ name: 'Alice', email: 'alice@example.com' });

// CREATE — many
await User.insertMany([{ name: 'Bob' }, { name: 'Carol' }], { ordered: false });

// READ ONE
const found = await User.findOne({ email: 'alice@example.com' }).lean();

// READ MANY — filter, sort, paginate, project
const users = await User
  .find({ age: { $gte: 18 }, isActive: true })
  .sort({ createdAt: -1 })
  .skip(20).limit(10)
  .select('name email role -_id');

// UPDATE — findByIdAndUpdate returns old doc by default
const updated = await User.findByIdAndUpdate(
  id,
  { $set: { age: 31 }, $push: { tags: 'senior' } },
  { new: true, runValidators: true }
);

// UPDATE MANY
await User.updateMany({ isActive: false }, { $set: { role: 'user' } });

// DELETE
await User.findByIdAndDelete(id);
await User.deleteMany({ createdAt: { $lt: cutoff } });

// UPSERT — create if not exists, update if exists
await User.findOneAndUpdate(
  { email: 'new@example.com' },
  { $set: { name: 'New User' } },
  { upsert: true, new: true }
);`} />
          <Tip icon="💡" color={D.yellow} title="Query operators cheatsheet">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[["Comparison", "$eq $ne $gt $gte $lt $lte $in $nin"],["Logical", "$or $and $not $nor"],["Array", "$all $elemMatch $size"],["Element", "$exists $type"],["Evaluation", "$regex $where $expr"],["Update", "$set $unset $push $pull $inc $addToSet"]].map(([cat, ops], i) => (
                <div key={i} style={{ padding: "5px 8px", background: D.surface, borderRadius: 5 }}>
                  <div style={{ fontSize: 10, color: "#14b8a6", fontFamily: mono, marginBottom: 2 }}>{cat}</div>
                  <div style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>{ops}</div>
                </div>
              ))}
            </div>
          </Tip>
          <Tip icon="⚡" color="#3b82f6" title=".lean() — double the performance">.lean() returns plain JS objects instead of full Mongoose documents. No virtuals, no methods, no change tracking. Use it on read-only queries — it is 2x faster and uses less memory.</Tip>
        </div>
      )}
      {tab === "aggregation" && (
        <div>
          <EasyBox emoji="🔢" title="What is the Aggregation Pipeline?" color="#8b5cf6">The aggregation pipeline is MongoDB's answer to SQL GROUP BY, JOINs, and computed columns. You chain stages — each stage transforms the documents flowing through it. Critical for analytics, dashboards, and reporting.</EasyBox>
          <CodeBlock label="aggregation pipeline stages" code={`// Count orders per user, only for users with 3+ orders
db.orders.aggregate([
  // Stage 1: filter documents (like WHERE)
  { $match: { status: 'completed', total: { $gt: 0 } } },

  // Stage 2: group + compute (like GROUP BY)
  { $group: {
    _id: '$userId',
    orderCount: { $sum: 1 },
    totalSpent: { $sum: '$total' },
    avgOrder:   { $avg: '$total' },
    lastOrder:  { $max: '$createdAt' }
  }},

  // Stage 3: filter groups (like HAVING)
  { $match: { orderCount: { $gte: 3 } } },

  // Stage 4: join another collection (like LEFT JOIN)
  { $lookup: {
    from:         'users',
    localField:   '_id',
    foreignField: '_id',
    as:           'user'
  }},

  // Stage 5: flatten the joined array
  { $unwind: '$user' },

  // Stage 6: shape the output (like SELECT)
  { $project: {
    _id: 0,
    userName:   '$user.name',
    orderCount: 1,
    totalSpent: { $round: ['$totalSpent', 2] }
  }},

  // Stage 7: sort results
  { $sort: { totalSpent: -1 } },

  // Stage 8: pagination
  { $skip: 0 },
  { $limit: 10 }
]);`} />
          <CodeBlock label="useful aggregation stages" code={`$match    // filter (use EARLY to reduce documents)
$group    // group + aggregate ($sum, $avg, $min, $max, $push, $addToSet)
$project  // shape output (include/exclude/compute fields)
$sort     // sort documents
$limit    // limit count
$skip     // skip for pagination
$lookup   // LEFT JOIN another collection
$unwind   // deconstruct array field into separate documents
$addFields // add computed fields without removing existing ones
$count    // count documents
$facet    // run multiple pipelines in parallel
$bucket   // group into ranges (price ranges, age buckets)`} />
          <Tip icon="⚡" color="#f59e0b" title="Performance tip">Always put $match first. Every document that passes through $match reduces the work for all subsequent stages. Without an early $match, MongoDB processes the entire collection.</Tip>
        </div>
      )}
      {tab === "indexes" && (
        <div>
          <EasyBox emoji="⚡" title="MongoDB Indexes" color="#14b8a6">MongoDB indexes work exactly like PostgreSQL indexes — B-trees under the hood. Without an index, MongoDB does a collection scan (reads every document). Use explain() to see what MongoDB is doing.</EasyBox>
          <CodeBlock label="creating and managing indexes" code={`// Single field
db.users.createIndex({ email: 1 });           // 1 = ascending, -1 = descending

// Compound index — order matters
db.orders.createIndex({ userId: 1, createdAt: -1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Sparse index — only indexes documents where field exists
db.users.createIndex({ phone: 1 }, { sparse: true });

// TTL index — auto-delete documents after N seconds
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// Text index — full text search
db.posts.createIndex({ title: 'text', content: 'text' });
db.posts.find({ $text: { $search: 'mongodb aggregation' } });

// List indexes
db.users.getIndexes();

// Check query plan — does it use an index?
db.users.find({ email: 'alice@example.com' }).explain('executionStats');`} />
          <CodeBlock label="Mongoose index syntax" code={`// In schema definition
const userSchema = new mongoose.Schema({
  email:     { type: String, index: true, unique: true },
  createdAt: { type: Date, index: true },
});

// Compound index on schema
userSchema.index({ lastName: 1, firstName: 1 });
userSchema.index({ createdAt: -1, role: 1 });

// TTL index in Mongoose
sessionSchema.index({ createdAt: 1 }, { expires: '1h' });`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "10px 0" }}>
            <div style={{ padding: "10px 12px", background: D.green + "0a", border: `1px solid ${D.green}33`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.green, fontFamily: mono, marginBottom: 6 }}>✅ ALWAYS INDEX THESE</div>
              {["Fields in find() / match() filters", "Fields used in sort()", "Foreign key ref fields (_id, userId)", "Fields used in $lookup joins", "TTL fields (session expiry)"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
            <div style={{ padding: "10px 12px", background: D.red + "0a", border: `1px solid ${D.red}33`, borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: D.red, fontFamily: mono, marginBottom: 6 }}>⚠️ WATCH OUT</div>
              {["Too many indexes slow writes", "Index field order matters in compound", "High write collections: index selectively", "Arrays of arrays — multikey index overhead", "Indexes take disk space"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: serif, padding: "2px 0" }}>• {x}</div>)}
            </div>
          </div>
        </div>
      )}
      {tab === "populate" && (
        <div>
          <EasyBox emoji="🔗" title="References and Population" color="#3b82f6">When you store ObjectId references instead of embedded documents, you use populate() to fetch the referenced documents. It's MongoDB's equivalent of a JOIN — but done in application code (two separate queries under the hood).</EasyBox>
          <CodeBlock label="schema with references" code={`const postSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  content: String,
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  comments: [{
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body:    String,
    postedAt:{ type: Date, default: Date.now }
  }]
});`} />
          <CodeBlock label="populate — basic to advanced" code={`// Basic populate
const post = await Post.findById(id).populate('author');

// Select only specific fields from populated doc
const post = await Post.findById(id)
  .populate('author', 'name email -_id');

// Populate multiple paths
const post = await Post.findById(id)
  .populate('author', 'name')
  .populate('tags', 'name color');

// Nested populate — populate inside populated doc
const post = await Post.findById(id).populate({
  path: 'comments.user',
  select: 'name avatar'
});

// Populate with filter
const post = await Post.findById(id).populate({
  path: 'comments',
  match: { approved: true },
  options: { limit: 5, sort: { postedAt: -1 } }
});`} />
          <Tip icon="⚠️" color="#f43f5e" title="populate() is 2 queries, not 1">populate() fires a second query to fetch the referenced documents. For large result sets, this can cause the N+1 problem. Use aggregation $lookup instead when querying many documents — it resolves in a single pipeline.</Tip>
          <CodeBlock label="$lookup vs populate — when to use which" code={`// Use populate: fetching a single document's relations
const user = await User.findById(id).populate('orders'); // fine

// Use $lookup in aggregation: bulk queries, analytics, reports
db.posts.aggregate([
  { $match: { status: 'published' } },
  { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'author' }},
  { $unwind: '$author' }
]); // one query, always`} />
        </div>
      )}
      {tab === "hooks" && (
        <div>
          <EasyBox emoji="🪝" title="Mongoose Middleware (Hooks)" color="#8b5cf6">Mongoose middleware (hooks) are functions that run before or after certain operations. Use them for hashing passwords, logging, cascading deletes, updating timestamps, and input sanitization — without polluting your route handlers.</EasyBox>
          <CodeBlock label="pre and post hooks" code={`const userSchema = new mongoose.Schema({ ... });

// pre('save') — runs before .save() and .create()
userSchema.pre('save', async function(next) {
  // 'this' refers to the document being saved
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next(); // must call next() or the operation hangs
});

// pre('save') — set slug from title
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

// post('save') — runs after save completes
userSchema.post('save', function(doc, next) {
  console.log(\`User \${doc.email} saved\`);
  // send welcome email, update analytics, etc.
  next();
});

// pre('findOneAndUpdate') — hooks for update queries
userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// pre('deleteOne') — cascade delete
userSchema.pre('deleteOne', { document: true }, async function(next) {
  await Post.deleteMany({ author: this._id });
  next();
});

// Query middleware — 'this' is the Query, not the document
userSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } }); // always exclude soft-deleted
  next();
});`} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "10px 0" }}>
            <div style={{ padding: "10px 12px", background: "#8b5cf60a", border: "1px solid #8b5cf633", borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: "#8b5cf6", fontFamily: mono, marginBottom: 6 }}>DOCUMENT MIDDLEWARE</div>
              {["save, validate, remove, updateOne, deleteOne"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: mono, padding: "2px 0" }}>{x}</div>)}
            </div>
            <div style={{ padding: "10px 12px", background: "#3b82f60a", border: "1px solid #3b82f633", borderRadius: 7 }}>
              <div style={{ fontSize: 10, color: "#3b82f6", fontFamily: mono, marginBottom: 6 }}>QUERY MIDDLEWARE</div>
              {["find, findOne, findOneAndUpdate,", "findOneAndDelete, updateMany, deleteMany"].map((x, i) => <div key={i} style={{ fontSize: 11, color: D.muted, fontFamily: mono, padding: "2px 0" }}>{x}</div>)}
            </div>
          </div>
          <Tip icon="⚠️" color="#f59e0b" title="Hook gotcha">updateMany() and findByIdAndUpdate() do NOT trigger 'save' hooks. Use pre('findOneAndUpdate') or pre('updateMany') for those. This trips up most developers.</Tip>
        </div>
      )}
      {tab === "patterns" && (
        <div>
          <EasyBox emoji="🏗️" title="Real-world MongoDB patterns" color="#14b8a6">These are the patterns interviewers ask about and production systems actually use.</EasyBox>
          <CaseStudy title="Soft Delete Pattern" color="#f43f5e" scenario="Never permanently delete user data" problem="Hard deletes are irreversible. Compliance may require retaining records." solution="Add deletedAt field; filter it out in all queries via a global hook">
            <CodeBlock label="soft delete implementation" code={`userSchema.add({ deletedAt: { type: Date, default: null } });

// Global pre-find hook to exclude soft-deleted docs
userSchema.pre(/^find/, function(next) {
  this.where({ deletedAt: null });
  next();
});

// Soft delete method
userSchema.methods.softDelete = function() {
  this.deletedAt = new Date();
  return this.save();
};`} />
          </CaseStudy>
          <CaseStudy title="Pagination Pattern" color="#3b82f6" scenario="Infinite scroll or paginated API" problem="OFFSET-based pagination gets slow at large offsets (MongoDB scans skipped docs)" solution="Cursor-based pagination using _id or createdAt">
            <CodeBlock label="cursor-based pagination" code={`// Request: GET /posts?cursor=<lastId>&limit=20
async function getPosts(cursor, limit = 20) {
  const query = cursor
    ? { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }
    : {};

  const posts = await Post
    .find(query)
    .sort({ _id: -1 })
    .limit(limit + 1);      // fetch one extra to know if there's a next page

  const hasMore = posts.length > limit;
  return {
    data: posts.slice(0, limit),
    nextCursor: hasMore ? posts[limit - 1]._id : null,
  };
}`} />
          </CaseStudy>
          <CaseStudy title="Optimistic Concurrency" color="#8b5cf6" scenario="Two users edit the same document simultaneously" problem="Last-write-wins corrupts data when concurrent edits happen" solution="Version field (__v) — reject update if document changed since last read">
            <CodeBlock label="optimistic locking with version" code={`const result = await Post.findOneAndUpdate(
  { _id: postId, __v: clientVersion },  // only update if version matches
  { $set: { content: newContent }, $inc: { __v: 1 } },
  { new: true }
);

if (!result) {
  throw new Error('Document was modified by another user. Please refresh.');
}`} />
          </CaseStudy>
          <Tip icon="🎤" color="#ec4899" title="Interview: when NOT to use MongoDB">Say: 'MongoDB is great for flexible schemas and horizontal scaling, but I would NOT use it for complex multi-document transactions (bank transfers), heavy JOINs across many collections, or when strong schema enforcement is critical. For those cases PostgreSQL is a better fit.'</Tip>
        </div>
      )}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What data format does MongoDB store internally?" options={["JSON", "XML", "BSON (Binary JSON)", "CSV"]} correct={2} explain="MongoDB stores data as BSON (Binary JSON) — a binary-encoded format that supports extra types like ObjectId, Date, and Decimal128 that plain JSON does not support." />
          <QuizCard question="What does Mongoose add to MongoDB?" options={["A SQL interface", "Schemas, validation, and middleware hooks", "A GUI admin panel", "Automatic backups"]} correct={1} explain="Mongoose is an ODM that adds schemas, validation, type casting, query building, virtuals, and middleware hooks to MongoDB." />
          <QuizCard question="When should you EMBED data vs REFERENCE it?" options={["Always embed", "Always reference", "Embed when read together, reference when shared", "It does not matter"]} correct={2} explain="Embed related data that is always read together (faster reads, one query). Reference data that is shared across many documents to avoid duplication." />
          <QuizCard question="What does .lean() do in Mongoose?" options={["Prevents memory leaks", "Returns plain JS objects instead of Mongoose documents", "Enables lazy loading", "Validates schema before query"]} correct={1} explain=".lean() skips Mongoose document wrapping — no virtuals, no methods, no change tracking. This makes read queries about 2x faster. Use it for read-only data." />
          <QuizCard question="Which aggregation stage acts like SQL's WHERE clause?" options={["$group", "$project", "$match", "$filter"]} correct={2} explain="$match filters documents — equivalent to WHERE in SQL. Always place $match early in the pipeline to reduce the number of documents flowing through subsequent stages." />
          <QuizCard question="Does findByIdAndUpdate() trigger a 'save' middleware hook?" options={["Yes, always", "Only if you pass { save: true }", "No — use pre('findOneAndUpdate') instead", "Only for pre hooks, not post"]} correct={2} explain="findByIdAndUpdate() bypasses 'save' hooks entirely. You must use pre('findOneAndUpdate') to intercept query-based updates. This is a common source of bugs when hashing passwords." />
          <QuizCard question="What is the N+1 problem in the context of populate()?" options={["Fetching N documents requires N+1 queries", "Documents grow by N+1 on each update", "Indexes slow after N+1 entries", "populate() fails on N+1 references"]} correct={0} explain="If you fetch N posts and populate their authors, Mongoose fires 1 query for posts + 1 query for each author = N+1 total queries. Fix with $lookup in aggregation (1 query) or by batching." />
        </div>
      )}
      {tab === "demo" && <MongoQueryDemo />}
    </div>
  );
}
