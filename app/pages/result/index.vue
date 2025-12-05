<script lang="ts" setup>
import {ref, reactive, onMounted} from 'vue'

const reportReady = ref<boolean>(false)

let finalMessage = ref<string>("\n--- تغذیه ---\nstart this subdomain### تحلیل بر اساس پرسشنامه\nبا توجه به اطلاعات ارائه شده، شما یک زن 33 ساله با قد 165 سانتی‌متر و وزن 76 کیلوگرم هستید که هدف اصلی شما کاهش چربی بدن است. از آنجایی که تنها یک وعده غذایی در روز مصرف می‌کنید و عادات غذایی نامنظمی دارید (مانند مصرف زیاد نان و برنج، مصرف کم سبزیجات، و ولع به شیرینی)، این می‌تواند منجر به مشکلاتی مانند نفخ، دیر سیر شدن، و خستگی پس از غذا شود. همچنین، عدم تحمل لاکتوز دارید و سبک زندگی کم تحرکی را دنبال می‌کنید. برنامه غذایی زیر با در نظر گرفتن این شرایط و با تمرکز بر غذاهای سنتی ایرانی طراحی شده است تا به شما در کاهش چربی بدن، بهبود عادات غذایی و کاهش علائم گوارشی کمک کند. این برنامه شامل 3 وعده اصلی و 2 میان وعده در روز است تا متابولیسم را افزایش دهد و از پرخوری جلوگیری کند.\n\n### برنامه غذایی یک هفته‌ای\nشروع جدول  \n| روز | صبحانه | ناهار | شام | میان وعده |\n|-----|---------|-------|-----|-----------|\n| شنبه | یک عدد تخم مرغ آبپز + نصف کف دست نان سنگک + یک عدد گوجه فرنگی | یک کف دست گوشت قرمز کبابی + یک بشقاب کوچک سالاد سبزیجات (کاهو، خیار، گوجه) + 5 قاشق برنج | یک کف دست مرغ گریل شده + یک مشت سبزیجات بخارپز (هویج، لوبیا سبز) | یک عدد سیب + یک مشت آجیل بی‌نمک |\n| یکشنبه | یک لیوان شیر بدون لاکتوز + نصف کف دست نان تست + یک قاشق مرباخوری عسل | یک کف دست ماهی قزل آلا + یک بشقاب کوچک سالاد (شامل سبزیجات تازه) + 4 قاشق برنج | یک کف دست کوکو سبزی + یک بشقاب ماست بدون لاکتوز | یک عدد موز + یک عدد خرما |\n| دوشنبه | یک عدد املت با یک تخم مرغ و سبزیجات (گوجه و قارچ) + نصف کف دست نان | یک کف دست گوشت چرخ کرده کبابی + یک بشقاب سبزیجات خام (هویج، خیار) + 5 قاشق برنج | یک کف دست مرغ آبپز + یک بشقاب سالاد شیرازی | یک عدد پرتقال + یک مشت پسته |\n| سه‌شنبه | یک لیوان چای + نصف کف دست نان با پنیر بدون لاکتوز | یک کف دست جوجه کباب + یک بشقاب سالاد (کاهو، گوجه) + 4 قاشق برنج | یک کف دست کتلت گوشت + یک بشقاب سبزیجات پخته (اسفناج) | یک عدد سیب + یک عدد انجیر خشک |\n| چهارشنبه | یک عدد تخم مرغ نیمرو + نصف کف دست نان + یک عدد خیار | یک کف دست کباب برگ + یک بشقاب سالاد (سبزیجات متنوع) + 5 قاشق برنج | یک کف دست ماهی تن + یک بشقاب سبزیجات (کلم بروکلی بخارپز) | یک عدد هلو + یک مشت بادام |\n| پنجشنبه | یک لیوان شیر بدون لاکتوز + نصف کف دست نان با یک قاشق مرباخوری مربا | یک کف دست گوشت بوقلمون + یک بشقاب سالاد + 4 قاشق برنج | یک کف دست شامی + یک بشقاب ماست بدون لاکتوز | یک عدد گلابی + یک عدد کشمش |\n| جمعه | یک عدد املت سبزیجات (با جعفری و گشنیز) + نصف کف دست نان | یک کف دست کباب کوبیده + یک بشقاب سالاد + 5 قاشق برنج | یک کف دست مرغ شکم پر (با سبزیجات) + یک بشقاب سبزیجات | یک عدد انار + یک مشت فندق |\nپایان جدول\n\n### توصیه های کلیدی برای اجرای موفق برنامه\n1. **تعداد وعده های غذایی را افزایش دهید:** سعی کنید به جای یک وعده، از 3 وعده اصلی و 2 میان وعده استفاده کنید تا قند خون ثابت بماند و از ولع به شیرینی و پرخوری جلوگیری شود.\n2. **کنترل portions:** از مقیاس‌های ارائه شده ( مانند \"کف دست\" برای گوشت و \"قاشق\" برای برنج) پیروی کنید تا calories دریافتی کنترل شود.\n3. **مصرف آب را افزایش دهید:** روزانه 2-3 لیوان آب بنوشید (حدود 8-10 لیوان) و یک لیوان آب قبل از غذا میل کنید تا احساس سیری زودتر ایجاد شود.\n4. **مدیریت زمان غذا خوردن:** وعده شام را حداقل 2-3 ساعت قبل از خواب مصرف کنید تا نفخ و مشکلات گوارشی کاهش یابد.\n5. **افزایش فعالیت بدنی:** برای کمک به کاهش چربی بدن، روزانه 30 دقیقه پیاده روی سبک را شروع کنید و به تدریج شدت آن را افزایش دهید.\n6. **مقابله با ولع شیرینی:** از میوه ها، خرما یا آجیل به عنوان جایگزین شیرینی استفاده کنید.\n7. **تهیه غذاهای سالم:** از روش های پخت سالم مانند کبابی کردن، بخارپز یا آبپز استفاده کنید و از سرخ کردن اجتناب نمایید.\n8. **پیگیری انگیزه:** اهداف کوچک و قابل دستیابی设定 کنید (مثلاً کاهش 1 کیلوگرم در هفته) و پیشرفت خود را در یک دفترچه ثبت کنید.\n9. **افزایش مصرف سبزیجات:** در هر وعده غذایی از سبزیجات تازه یا پخته استفاده کنید تا فیبر دریافتی افزایش یابد و احساس سیری طولانی تر شود.\n10. **استفاده از جایگزین های بدون لاکتوز:** از لبنیات بدون لاکتوز مانند شیر و ماست بدون لاکتوز به جای انواع معمولی استفاده کنید.end this subdomain\n\n=== SUMMARY ===\nstart firstسلام و عرض ادب خدمت شما همراه گرامی\nبا تشکر از وقتی که برای تکمیل پرسشنامه گذاشتید. من با دقت پاسخ‌های شما را بررسی کردم و در ادامه، تحلیل کلی از وضعیتتان را به زبان ساده برای شما توضیح می‌دهم.\n\n### **تحلیل الگوی تغذیه‌ای و جزئیات مصرف غذایی**\n\nالگوی غذایی شما در حال حاضر نامتعادل است. شما تنها یک وعده غذایی اصلی در روز مصرف می‌کنید، اما در عوض مقدار نان و برنج نسبتاً زیادی می‌خورید. مصرف روزانه گوشت نقطه قوت برنامه شماست، چون پروتئین لازم را تا حدی تأمین می‌کند. با این حال، مصرف بسیار کم سبزیجات (کمتر از یک وعده) یک نقطه ضعف بزرگ محسوب می‌شود. سبزیجات منابع فوق‌العاده‌ای از ویتامین‌ها، مواد معدنی و فیبر هستند که برای سلامت بدن و رسیدن به هدفتان یعنی \"کاهش چربی بدن\" کاملاً ضروری‌اند.\n\nخوشبختانه مصرف غذاهای فرآوری‌شده (مانند فست‌فود) در برنامه شما بسیار کم است و این یک عادت بسیار خوب و سالم است. نوشیدنی اصلی شما چای است و روزانه ۱ تا ۲ لیتر آب می‌نوشید که میزان مناسبی است، اما بهتر است توجه داشته باشید که نوشیدن آب کافی به ویژه قبل از غذا می‌تواند به احساس سیری و کنترل اشتها کمک کند.\n\n### **تحلیل عادت‌ها و سبک زندگی**\n\nسبک زندگی شما در حال حاضر کم‌تحرک است، چرا که هیچ فعالیت فیزیکی منظمی در هفته ندارید. وقتی ورزش نکنید، بدن کالری کمتری می‌سوزاند و این موضوع کاهش وزن و به ویژه کاهش چربی بدن را بسیار سخت‌تر می‌کند. خواب شما اگرچه از نظر مدت زمان (بیش از ۹ ساعت) کافی به نظر می‌رسد، اما به دلیل نامنظم بودن، ممکن است کیفیت مطلوبی نداشته باشد. خواب نامنظم می‌تواند روی هورمون‌های کنترل‌کننده گرسنگی و اشتها تأثیر بگذارد و ولع شما به شیرینی را افزایش دهد.\n\nعادت غذایی دیگری که دارید، تمایل به خوردن در ساعات عصر و شب است. معمولاً در این ساعات بدن تحرک کمتری دارد و ممکن است کالری‌های دریافتی به جای سوزانده شدن، به صورت چربی ذخیره شوند. ترکیب این موضوع با \"ولع به شیرینی\" می‌تواند یک چالش بزرگ برای شما ایجاد کند.\n\n### **تحلیل وضعیت گوارشی و متابولیکی**\n\nشما به عدم تحمل لاکتوز مبتلا هستید که به این معنی است که بدن شما در هضم قند موجود در لبنیات مشکل دارد. این یک نکته بسیار مهم است که در برنامه‌ریزی غذایی باید حتماً به آن توجه شود تا از علائمی مانند نفخ و ناراحتی گوارشی جلوگیری کنید. علاوه بر این، شما به طور معمول بعد از غذا احساس نفخ و خستگی متوسط دارید و دیر سیر می‌شوید.\n\nاین علائم می‌توانند چندین دلیل داشته باشند. خوردن تنها یک وعده غذایی بزرگ در روز باعث می‌شود سیستم گوارش شما به یکباره تحت فشار قرار گیرد و منجر به نفخ و سنگینی شود. همچنین، مصرف کم فیبر (به دلیل نخوردن سبزیجات) و مصرف کربوهیدرات‌های تصفیه‌شده (مانند نان) می‌تواند در ایجاد این حس خستگی و دیر سیر شدن نقش داشته باشد. فیبر به شما کمک می‌کند زودتر و برای مدت طولانی‌تری احساس سیری کنید.\n\n### **تحلیل ترجیحات غذایی، هدف و چالش‌ها**\n\nهدف اصلی شما \"کاهش چربی بدن\" است که با توجه به قد و وزن شما، یک هدف کاملاً منطقی و سلامتی‌محور به نظر می‌رسد. خبر خوب این است که شما به غذاهای سنتی ایرانی علاقه دارید. این نوع غذاها پتانسیل بسیار بالایی برای سالم بودن دارند، به شرطی که در روش پخت و مقدار مواد اولیه (به ویژه روغن و برنج) تعدیل و اصلاح صورت گیرد.\n\nمهم‌ترین چالش و مانعی که خودتان به آن اشاره کردید، \"نداشتن انگیزه\" است. این یک احساس کاملاً رایج است. معمولاً وقتی نتایج به کندی ظاهر می‌شوند یا برنامه بیش از حد سخت باشد، انگیزه کاهش می‌یابد. خوشبختانه شما برای تهیه غذا حدود یک ساعت وقت دارید و به تمام جنبه‌های غذا (طعم، سلامت، هزینه و سرعت) اهمیت می‌دهید که این موضوع، طراحی یک برنامه غذایی عملی و لذت‌بخش را برای شما ممکن می‌سازد. کلید کار، ایجاد تغییرات کوچک، پایدار و قابل مدیریت است که به تدریج انگیزه شما را با دیدن نتایج مثبت، افزایش خواهد داد.end first");
let message = reactive<string[]>([]);
let firstPartMessage = ref<string>('');
let firstPartMessages = reactive<string[]>([]);
let secondPartMessage = reactive<string[]>([]);

let tableBlocks = reactive<string[]>([]);
const nonTableText = ref<string>('');

function cleanLatexText(rawText: string) {
  return rawText
      .replace(/\\\[(.*?)\\]/gs, (_, formula) => {
        return formula
            .replace(/\\(text|mathbf){([^}]*)}/g, '$2')
            .replace(/\\frac{([^}]*)}{([^}]*)}/g, '$1/$2')
            .replace(/\\times/g, '×')
            .replace(/\\%/g, '%')
            .replace(/\s+/g, ' ')
            .trim();
      })

      .replace(/\\(text|mathbf){([^}]*)}/g, '$2')
      .replace(/\\frac{([^}]*)}{([^}]*)}/g, '$1/$2')
      .replace(/\\times/g, '×')
      .replace(/\\%/g, '%')

      .trim();
}

async function processMessage() {
  finalMessage.value = finalMessage.value.toString().replace(/\u200c/g, ' ');
  finalMessage.value = finalMessage.value.toString().replaceAll('\u200c', ' ');
  finalMessage.value = finalMessage.value.toString().replaceAll('*', ' ');
  finalMessage.value = finalMessage.value.toString().replaceAll('-', '');
  finalMessage.value = finalMessage.value.toString().replaceAll('#', '');
  finalMessage.value = finalMessage.value
      .toString()
      .replace(/[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uAC00-\uD7AF\u3040-\u30FF]/g, '');
  finalMessage.value = finalMessage.value.toString().replaceAll('(۱۵۰ کلمه در ۲ پاراگراف)', '');
  finalMessage.value = finalMessage.value.toString().replaceAll('(۱۵۰ کلمه در 2 پاراگراف)', '');
  finalMessage.value = finalMessage.value.toString().replaceAll('(150 کلمه در ۲ پاراگراف)', '');
  finalMessage.value = finalMessage.value.toString().replaceAll('(150 کلمه در 2 پاراگراف)', '');
  finalMessage.value = finalMessage.value.toString().replace('پاراگراف اول:', '');
  finalMessage.value = finalMessage.value.toString().replace('پاراگراف دوم:', '');
  finalMessage.value = finalMessage.value.toString().replace('پاراگراف سوم:', '');
  finalMessage.value = finalMessage.value
      .toString()
      .replaceAll(/\([\u0600-\u06FF]*\s*[0-9\u06F0-\u06F9]+\s*[\u0600-\u06FF]*\)/g, '');
  finalMessage.value = finalMessage.value
      .toString()
      .replaceAll(
          /\([\u0600-\u06FFa-zA-Z]*\s*[0-9\u06F0-\u06F9]+\s*[\u0600-\u06FFa-zA-Z]*\s*(در\s*[0-9\u06F0-\u06F9]+\s*[\u0600-\u06FFa-zA-Z]*)?\)/g,
          '',
      );
  finalMessage.value = cleanLatexText(finalMessage.value.toString());

  finalMessage.value = finalMessage.value.toString().replaceAll('=== SUMMARY ===', '');
  finalMessage.value = finalMessage.value.toString().replaceAll('Area:', '');

  message = finalMessage.value.toString().split('start first');
  firstPartMessage.value = message[1]?.toString().replace('end first', '') || "";
  firstPartMessage.value = firstPartMessage.value.toString().replace(/\([^()]*\)/g, '');
  firstPartMessage.value = firstPartMessage.value.toString().replace('پاراگراف اول:', '');
  firstPartMessage.value = firstPartMessage.value.toString().replace('پاراگراف دوم:', '');
  firstPartMessage.value = firstPartMessage.value.toString().replace('پاراگراف سوم:', '');
  firstPartMessage.value = firstPartMessage.value.toString().replace('Paragraph 1:', '');
  firstPartMessage.value = firstPartMessage.value.toString().replace('Paragraph 2:', '');
  firstPartMessage.value = firstPartMessage.value.toString().replace('Paragraph 3:', '');
  firstPartMessages = firstPartMessage.value.toString().split('\n\n\n');

  const secondPart = message[0]?.toString().replace(/start this subdomain/g, '');
  secondPartMessage = secondPart?.toString().split('end this subdomain') || [""];

  await processTable();

}

async function processTable() {
  const startTag = 'شروع جدول';
  const endTag = 'پایان جدول';

  let text = secondPartMessage[0] || '';

  tableBlocks = [];

  const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'g');
  let match;
  let index = 0;

  while ((match = regex.exec(text)) !== null) {
    const cleanBlock = match[0]
        .replace(startTag, '')
        .replace(endTag, '')
        .trim();

    tableBlocks.push(cleanBlock);

    text = text.replace(match[0], `[TABLE_${index}]`);
    index++;
  }

  nonTableText.value = text.trim();
  message = nonTableText.value.split('end first');
  secondPartMessage[0] = nonTableText.value;
}

function renderCombinedContent(text: string) {
  if (!text) return '';

  let html = text;
  tableBlocks.forEach((table, i) => {
    const tableHtml = `
      <table class="my-5 border-collapse border border-gray-400 w-full text-center">
        ${table
        .split('\n')
        .filter((row) => row.trim() !== '')
        .map((row) => {
          const cols = row
              .split('|')
              .filter((c) => c.trim() !== '')
              .map((cell) => `<td class="border border-gray-400 p-2">${cell.trim()}</td>`)
              .join('');
          return `<tr>${cols}</tr>`;
        })
        .join('')}
      </table>
    `;
    html = html.replace(`[TABLE_${i}]`, tableHtml);
  });

  return html;
}

function onTimerFinished() {
  reportReady.value = true
}

function markReportReady() {
  reportReady.value = true
}

onMounted(() => {
  processMessage();
  markReportReady()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <Timer
        v-if="!reportReady"
        :duration="120"
        :show="!reportReady"
        @finished="onTimerFinished"
    />

    <div v-if="reportReady" class="max-h-[75vh] p-6 rounded-xl shadow-lg bg-white w-full text-center overflow-y-auto">

      <div class="w-[90%] mt-10 mx-auto flex justify-between">
        <div class="inline-block w-[15%]">
          <img src="~/assets/images/Armani.png" alt=""/>
        </div>
        <div class="inline-block w-[15%]">
          <img src="~/assets/images/GoldMedal.png" alt=""/>
        </div>
      </div>

      <div class="w-[95%] mx-auto mt-5 relative">
        <p class="text-justify leading-relaxed whitespace-pre-line">
          {{ firstPartMessage }}
        </p>
      </div>

      <div class="mt-20">
        <div
            class="text-black w-[90%] mx-auto box-border"
            v-for="(message, index) in secondPartMessage"
            :key="index"
        >
          <p
              class="text-justify whitespace-pre-line"
              v-html="renderCombinedContent(message)"
          ></p>

        </div>
        <div class="text-black w-[90%] mx-auto box-border mb-10">
          <p class="text-justify whitespace-pre-line">
            {{ message[1] }}
          </p>
        </div>
      </div>
      <p class="text-center">
        {{ $t("contactHint") }}
        <br/>
        <a href="tel:+982332300357">023-32300357</a>
        /
        <a href="tel:+989046504331">09046504331</a>
        <br/>
      </p>
    </div>
  </div>
</template>

