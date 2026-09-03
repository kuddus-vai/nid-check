# Bangladesh Election Commission - NID Server Copy Viewer

বাংলাদেশ নির্বাচন কমিশন (NIDW) এর অফিসিয়াল ফরম্যাটে জাতীয় পরিচয়পত্র সার্ভার কপি লেআউট ও এপিআই (API) রেসপন্স ইন্টিগ্রেশন প্রজেক্ট।

---

## 🚀 বৈশিষ্ট্যসমূহ (Features)

- **অফিসিয়াল লেআউট**: বাংলাদেশ নির্বাচন কমিশনের আসল সার্ভার কপির হুবহু ডিজাইন ও কালার প্যালেট।
- **লাইভ এপিআই ডেটা সমর্থন**: যেকোনো সার্ভার কপি এপিআই JSON রেসপন্স সরাসরি পেস্ট করে রেন্ডার করার সুবিধা।
- **QR কোড জেনারেশন**: ভোটার ভেরিফিকেশন XML পে-লোড সম্বলিত ডায়নামিক QR কোড।
- **A4 প্রিন্ট ও PDF এক্সপোর্ট**: কোনো অনাকাঙ্ক্ষিত মার্জিন বা কাটছাঁট ছাড়াই এক ক্লিকে পরিষ্কার A4 সাইজ প্রিন্ট ও PDF হিসেবে সেভ করার সুবিধা।
- **তথ্য এডিটর**: প্রয়োজন অনুযায়ী তাৎক্ষণিকভাবে তথ্য সম্পাদনা (Edit Data) এবং ছবি আপলোড করার সুযোগ।

---

## 🛠️ লোকাল ডেভেলপমেন্ট (Run Locally)

১. রিপোজিটরি ক্লোন করুন:
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd <REPO_DIRECTORY>
```

২. ডিপেনডেন্সি ইনস্টল করুন:
```bash
npm install
```

৩. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```
ব্রাউজারে `http://localhost:3000` লিংকে প্রবেশ করুন।

৪. প্রোডাকশন বিল্ড তৈরি করতে:
```bash
npm run build
```
ফাইলগুলো `dist/` ফোল্ডারে তৈরি হবে।

---

## 🌐 GitHub-এ আপলোড ও Deploy করার নিয়ম

### ধাপ ১: GitHub রিপোজিটরি তৈরি ও পুশ করুন
আপনার টার্মিনালে নিচের কমান্ডগুলো চালান:

```bash
# গিট ইনিশিয়ালাইজ করুন
git init

# সব ফাইল যোগ করুন
git add .

# কমিট করুন
git commit -m "Initial commit: NID Server Copy Layout"

# ব্রাঞ্চের নাম main করুন
git branch -M main

# আপনার GitHub রিপোজিটরি লিঙ্ক সংযুক্ত করুন (URL পরিবর্তন করুন)
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# GitHub-এ পুশ করুন
git push -u origin main
```

---

### ধাপ ২: GitHub Pages চালু করুন (স্বয়ংক্রিয় ডেপ্লয়)

এই প্রজেক্টে ইতিমধ্যে `.github/workflows/deploy.yml` সেটআপ করা আছে।

১. আপনার GitHub রিপোজিটরির **Settings** ট্যাবে যান।
২. বাম পাশের মেনু থেকে **Pages** সিলেক্ট করুন।
৩. **Build and deployment** সেকশনের অধীনে **Source** ড্রপডাউন থেকে **`GitHub Actions`** নির্বাচন করুন।
৪. ব্যাস! প্রতিবার `main` ব্রাঞ্চে পুশ করলে স্বয়ংক্রিয়ভাবে আপনার সাইট লাইভ হয়ে যাবে।
   - লাইভ সাইটের লিংক হবে: `https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`

---

### বিকল্প: Vercel বা Netlify-তে ডেপ্লয়

- **Vercel**:
  1. [vercel.com](https://vercel.com)-এ গিয়ে GitHub রিপোজিটরিটি ইমপোর্ট করুন।
  2. Framework Preset: **Vite** নির্বাচন করুন।
  3. **Deploy** বাটনে ক্লিক করুন।
