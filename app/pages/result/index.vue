<script lang="ts" setup>
import {ref, reactive, onMounted} from 'vue'
import {useReportApi} from "~/composables/APIsAccess/useReportApi";

const {startReport, checkReport} = useReportApi();

let interval: ReturnType<typeof setInterval>

const reportReady = ref<boolean>(false)

let finalMessage = ref<string>("")
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

function isFetchError(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

async function startQuestionnaire() {
  try {
    await startReport(sessionStorage.getItem("questionnaireID") || "");

    await reportChecker()
    interval = setInterval(() => {
      reportChecker()
    }, 60000)

  } catch {
    await reportChecker()
  }
}

async function reportChecker() {
  try {
    const report = await checkReport(sessionStorage.getItem("questionnaireID") || "")

    if (report.status === 'done') {

      console.log(report)
      finalMessage.value = report.result.prompts[0].response
      console.log(finalMessage.value)
      await processMessage();
      markReportReady()
      clearInterval(interval)

    }
  } catch (error: unknown) {
    if (isFetchError(error) && error.status === 404) {
      await startQuestionnaire()
    } else {
      throw error
    }
  }
}

onMounted(() => {
  startQuestionnaire()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <Timer
        v-if="!reportReady"
        :duration="1200"
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

