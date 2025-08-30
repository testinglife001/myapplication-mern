require('dotenv').config();
const mongoose = require('mongoose');
const articleModel = require('./models/articleModel'); // adjust path if needed

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected for migration');
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
};

const migrateCategoryTag = async () => {
  try {
    const articles = await articleModel.find({});
    console.log(`Found ${articles.length} articles`);

    for (const article of articles) {
      let modified = false;

      // Convert category to array if it's a string
      if (article.category && typeof article.category === 'string') {
        article.category = [article.category];
        modified = true;
      }

      // Convert tag to array if it's a string
      if (article.tag && typeof article.tag === 'string') {
        article.tag = [article.tag];
        modified = true;
      }

      if (modified) {
        await article.save();
        console.log(`✅ Updated article: ${article._id}`);
      }
    }

    console.log('🎉 Migration completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
};

dbConnect().then(migrateCategoryTag);
