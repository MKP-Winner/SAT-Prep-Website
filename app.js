const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const topics = [
  {name:"Algebra", subject:"math", color:"#b9d9ff", icon:"∑", desc:"Linear equations, functions, inequalities, and systems.", count:"15 worksheets", tips:["Translate words into equations before solving.","Check a solution by substituting it back into the original equation.","Watch the sign when multiplying or dividing an inequality."], sample:"If 3x + 7 = 22, what is x?", answer:"x = 5", why:"Subtract 7 from both sides (3x = 15), then divide by 3."},
  {name:"Advanced Math", subject:"math", color:"#c8bcff", icon:"x²", desc:"Equivalent expressions, nonlinear equations, and functions.", count:"9 worksheets", tips:["Look for structure before expanding an expression.","A quadratic can have zero, one, or two real solutions.","Use the graph to confirm roots and intercepts."], sample:"Which value of x makes x² − 9 = 0?", answer:"x = 3 or x = −3", why:"Factor as (x − 3)(x + 3) = 0, so either factor can equal zero."},
  {name:"Problem Solving and Data Analysis", subject:"math", color:"#b9f3d6", icon:"▥", desc:"Ratios, percentages, probability, statistics, and data models.", count:"21 worksheets", tips:["Keep units consistent throughout a calculation.","A margin of error describes a range, not a guaranteed exact value.","Correlation does not automatically mean causation."], sample:"A $40 item is discounted by 25%. What is the sale price?", answer:"$30", why:"25% of $40 is $10; subtract the discount from the original price."},
  {name:"Geometry and Trigonometry", subject:"math", color:"#ffe1cd", icon:"△", desc:"Lines, angles, triangles, circles, area, volume, and right triangles.", count:"12 worksheets", tips:["Sketch a diagram and label the information you know.","Use the formula sheet as a starting point, not a last resort.","For right triangles, identify the opposite, adjacent, and hypotenuse."], sample:"A right triangle has legs 6 and 8. What is its hypotenuse?", answer:"10", why:"Use the Pythagorean theorem: √(6² + 8²) = √100 = 10."},
  {name:"Craft and Structure", subject:"reading", color:"#dcd2ff", icon:"Aa", desc:"Words in context, text structure, purpose, and cross-text connections.", count:"9 worksheets", tips:["Read one sentence before and after the referenced word.","Choose the answer that matches the passage’s specific purpose.","For paired texts, identify the relationship before comparing details."], sample:"In context, “qualified” most nearly means:", answer:"Limited or conditional", why:"Context clues determine the meaning; do not choose the everyday definition automatically."},
  {name:"Information and Ideas", subject:"reading", color:"#b9d9ff", icon:"⌁", desc:"Central ideas, details, inferences, and command of evidence.", count:"9 worksheets", tips:["Summarize the passage in a few words before looking at choices.","An inference must be supported by what the text says.","Evidence questions usually point to the line that proves the prior answer."], sample:"Which choice best states the central idea?", answer:"The author’s main claim", why:"The central idea should cover the whole passage, not just one supporting example."},
  {name:"Expression of Ideas", subject:"writing", color:"#ffe1cd", icon:"✦", desc:"Transitions and rhetorical synthesis for clear, purposeful writing.", count:"6 worksheets", tips:["Identify the relationship between sentences before choosing a transition.","Keep the writer’s stated goal in mind.","The best answer is concise and directly relevant."], sample:"Which transition best shows a contrast?", answer:"However", why:"“However” signals a change or contrast between the ideas on either side."},
  {name:"Standard English Conventions", subject:"writing", color:"#b9f3d6", icon:"✓", desc:"Boundaries, sentence structure, punctuation, and grammar.", count:"6 worksheets", tips:["Check whether both sides of punctuation can stand alone.","Use commas to separate nonessential information.","Make the subject and verb agree in number and tense."], sample:"Choose the correct sentence: “The results ___ clear.”", answer:"are", why:"“Results” is plural, so it takes the plural verb “are.”"}
];
const subjectNames = {math:"Math",reading:"Reading",writing:"Writing"};
const lessons = {
  "Algebra": {hook:"Translate the situation before you solve it.", concept:"Your Algebra worksheets repeatedly use linear equations, two-variable lines, systems, inequalities, and functions. Define the variable, identify the initial value and rate, and preserve the equality while isolating the unknown.", steps:["Write what each variable represents and attach units.","Translate phrases such as 'per month,' 'fixed cost,' and 'at least' into rate, intercept, and inequality notation.","Solve, then substitute into the original equation or check the graph."], example:"The folder's tape-dispenser problem models profit as revenue minus fixed cost. If P = 15,000 and fixed cost is 4,500, the remaining term represents monthly sales revenue. Do not mistake a rate or fixed cost for total revenue.", trap:"A negative sign reverses an inequality when you multiply or divide by a negative number.", source:"SAT Math-Translations (word Problems)_; SAT Math-Simple Equations Quiz 2_"},
  "Advanced Math": {hook:"Use patterns to make nonlinear work faster.", concept:"The College Panda, PrepPros, and Algebra worksheets emphasize equivalent expressions, exponents, factoring, nonlinear equations, and functions. Recognize structure before expanding or reaching for a calculator.", steps:["Apply exponent rules: a^m a^n = a^(m+n), (a^m)^n = a^(mn), and a^-m = 1/a^m.","For ax² + bx + c, find factor pairs whose product is ac and whose combined middle terms equal b.","After factoring, set each factor equal to zero and test both roots."], example:"The folder's factoring guide uses a² - b² = (a + b)(a - b). Thus x² - 25 factors to (x + 5)(x - 5), giving x = -5 or x = 5.", trap:"Do not add exponents when raising a power to a power; multiply the exponents.", source:"SAT Math-Exponents_; SAT Math-Foil and Factoring; The College Panda’s SAT Math Advanced Guide and Workbook"},
  "Problem Solving and Data Analysis": {hook:"Choose the model that matches the data.", concept:"The worksheet set covers ratios, rates, percentages, probability, one- and two-variable data, scatterplots, margin of error, and evaluating studies. Keep units visible and distinguish a sample result from a population claim.", steps:["Convert percentages to decimals or fractions before calculating, and label the unit.","For a mean, add all values and divide by the number of values; adding a constant to every value adds it to the mean.","For studies, identify observational versus experimental design and avoid claiming causation from association alone."], example:"A 25% discount on $40 is $10, so the price is $30. A sample result of 52 with a ±3 margin of error gives a reasonable interval from 49 to 55.", trap:"A scatterplot trend can show association, but it does not by itself prove cause and effect.", source:"Problem Solving and Data Analysis worksheets; PrepPros Complete Guide To Digital SAT Math"},
  "Geometry and Trigonometry": {hook:"Let the diagram choose the formula.", concept:"The included formula sheet groups volume, surface area, polygon area, circles, the Pythagorean theorem, common right triangles, and trigonometric relationships. Sketch first and identify the exact shape before substituting.", steps:["Use a² + b² = c² for right triangles; memorize the 3-4-5, 5-12-13, 8-15-17, and 7-24-25 patterns.","Use A = πr² for circle area and V = 1/3Bh for a pyramid or cone.","For similar figures, preserve corresponding side ratios; for angles, mark parallel-line relationships."], example:"The formula sheet gives the area of a triangle as 1/2bh, circle area as πr², and cylinder volume as πr²h. A right triangle with legs 6 and 8 has hypotenuse 10.", trap:"Do not use diameter as radius; radius is half the diameter.", source:"SAT Math - Formula Sheet_; Geometry and Trigonometry-Circles-Instructor; SAT Math - Triangles - Special"},
  "Craft and Structure": {hook:"Read for purpose, structure, and precise meaning.", concept:"Your Craft and Structure materials teach active reading, vocabulary in context, text structure and purpose, cross-text connections, and distractor detection. Ask what the author is doing—not simply what the passage is about.", steps:["Use the ACTIVATE strategy from the folder: Ask questions, Connect ideas, watch Time, Infer, identify Voice, and locate Evidence.","For vocabulary, replace the word with each choice in the sentence and keep the passage’s tone.","For paired texts, write each author’s claim and then label the relationship: agrees, qualifies, or disagrees."], example:"The distractor guide warns about Fake IDs, switches, extremes, and general statements. An answer that copies a phrase but changes its subject, cause, or degree is still wrong.", trap:"Words such as always, never, all, and absolutely need direct textual support; otherwise look for the less extreme choice.", source:"SAT Tips 1 - Active Reading; SAT Tips 3 - Distractors; Craft & Structure-Text Structure and Purpose-Student"},
  "Information and Ideas": {hook:"Summarize the whole passage before choosing.", concept:"The Main Idea guide recommends a one-sentence summary that includes the gist of all major topics. Information and Ideas questions also test details, inferences, textual evidence, and quantitative evidence.", steps:["Summarize the passage, then summarize each paragraph in a few words.","Look for repeated words or ideas; they often reveal the author’s focus.","Reject answers that are too narrow, too broad, or merely sound sophisticated; return to the evidence."], example:"For a result of 52 with a margin of error of ±3, the evidence supports 49–55—not one exact guaranteed value. A main-idea answer must cover the passage, not just this example.", trap:"Reverse-check a tempting answer: if the passage were really about that answer, would all major paragraphs fit?", source:"Information & Ideas - Main Idea_; Information & Ideas Central Ideas and Details-Student; Information & Ideas-Textual Evidence-Student"},
  "Expression of Ideas": {hook:"Name the relationship before looking at the choices.", concept:"The Transitions guide groups choices into continuers, contradictors, and cause-and-effect transitions. Cross out the transition, read both clauses independently, then identify how the ideas connect.", steps:["For continuation, consider also, moreover, additionally, or for example.","For contradiction, consider but, however, although, yet, or on the other hand.","For cause and effect, consider therefore, as a result, consequently, because, or since."], example:"The folder’s example contrasts “people are viewed as odd” with research showing solitude helps relationships. Crossing out the transition reveals a contradiction, so but fits.", trap:"Do not choose a transition because it sounds smooth; test the logical relationship first.", source:"SAT Expression of Ideas - Transitions.pdf"},
  "Standard English Conventions": {hook:"Identify the sentence structure before choosing punctuation.", concept:"The grammar materials focus on boundaries, colons, semicolons, dashes, commas, fragments, run-ons, parallelism, pronoun clarity, modifiers, and verb agreement/tense.", steps:["A colon follows an independent clause and introduces a list, explanation, phrase, or example.","A semicolon joins two closely related complete ideas; a dash can set off nonessential information or a list containing commas.","Check lists for parallel forms and check the true subject—not a phrase between subject and verb—for agreement."], example:"The folder’s parallelism guide corrects “Pete likes to run, jump, and swimming” to “run, jump, and swim.” Its punctuation guide says a colon can introduce a list only after a complete clause.", trap:"A nonessential middle phrase needs matching punctuation on both sides; a semicolon cannot repair a fragment.", source:"Boundaries-Colons, Semi-Colons, Dashes-student; Form, Structure, and Sense-Parallelism-student; SAT English-Grammer Overview Sheet"}
};
const questionBank = {
  "Algebra":[
    {q:"A company calculates its monthly profit by subtracting fixed monthly costs from monthly sales revenue. In the equation P = R - C, what does R represent?",o:["The monthly sales revenue","The revenue from each dispenser","The cost of each dispenser","The total fixed cost"],a:0,e:"R is the revenue term: it is the amount earned from all sales during the month."},
    {q:"If 4x - 9 = 27, what is the value of x?",o:["4.5","6","9","12"],a:1,e:"Add 9 to get 4x = 36, then divide by 4: x = 9. (Choice C.)"},
    {q:"The line y = 3x + 2 is parallel to which line?",o:["y = -3x + 2","y = 1/3x + 2","y = 3x - 7","y = -1/3x - 2"],a:2,e:"Parallel lines have the same slope. Both lines have slope 3. (Choice C.)"}
  ],
  "Advanced Math":[
    {q:"Which value of x makes x^2 - 9 = 0?",o:["-9 only","3 only","3 or -3","0 or 9"],a:2,e:"Factor as (x - 3)(x + 3) = 0, so x can be 3 or -3. (Choice C.)"},
    {q:"If f(x) = x^2 + 2x, what is f(3)?",o:["9","12","15","18"],a:2,e:"Substitute 3: 3^2 + 2(3) = 9 + 6 = 15. (Choice C.)"},
    {q:"The expression x^2 + 10x + 25 is equivalent to:",o:["(x + 5)^2","(x - 5)^2","(x + 10)^2","x(x + 25)"],a:0,e:"This is a perfect square trinomial: (x + 5)(x + 5). (Choice A.)"}
  ],
  "Problem Solving and Data Analysis":[
    {q:"A $40 item is discounted by 25%. What is the sale price?",o:["$10","$25","$30","$35"],a:2,e:"Twenty-five percent of $40 is $10. Subtracting gives $30. (Choice C.)"},
    {q:"A sample has a mean of 18. If every value increases by 4, what is the new mean?",o:["14","18","22","72"],a:2,e:"Adding the same amount to every value increases the mean by that amount: 18 + 4 = 22. (Choice C.)"},
    {q:"A study finds that students who sleep more tend to score higher. Which conclusion is justified?",o:["Sleep definitely causes higher scores.","There is an association between sleep and scores.","All students should sleep exactly 8 hours.","The study proves scores cause sleep."],a:1,e:"An observational association does not prove causation. (Choice B.)"}
  ],
  "Geometry and Trigonometry":[
    {q:"A right triangle has legs 6 and 8. What is its hypotenuse?",o:["7","10","12","14"],a:1,e:"By the Pythagorean theorem, c = sqrt(6^2 + 8^2) = sqrt(100) = 10. (Choice B.)"},
    {q:"A circle has radius 5. What is its area in terms of pi?",o:["5pi","10pi","25pi","50pi"],a:2,e:"Area = pi r^2 = pi(5^2) = 25pi. (Choice C.)"},
    {q:"Two parallel lines are cut by a transversal. If one corresponding angle is 115 degrees, the other corresponding angle is:",o:["65 degrees","75 degrees","115 degrees","180 degrees"],a:2,e:"Corresponding angles formed by parallel lines are congruent. (Choice C.)"}
  ],
  "Craft and Structure":[
    {q:"Text 1 says people sometimes hide their lunch preference to seem easygoing. Text 2 says this makes decisions harder. What response would Text 2 most likely suggest?",o:["Cancel lunch.","Ask where the friend usually eats.","State a preference about where to eat.","Change the subject."],a:2,e:"Text 2 directly recommends stating a preference because it makes the joint decision easier. (Choice C.)"},
    {q:"In context, the word 'qualified' most nearly means:",o:["Limited or conditional","Excited","Certified in every case","Unrelated"],a:0,e:"Context determines meaning; qualified often means limited by conditions. (Choice A.)"},
    {q:"A paragraph first describes a problem and then presents a possible solution. This structure is best described as:",o:["Chronological order","Compare and contrast","Problem and solution","Definition and example"],a:2,e:"The paragraph organizes information around a problem followed by a response. (Choice C.)"}
  ],
  "Information and Ideas":[
    {q:"Which choice best states a passage's central idea?",o:["A minor example","The author's main claim","An unrelated fact","A single adjective"],a:1,e:"A central idea should capture the main claim of the entire passage. (Choice B.)"},
    {q:"An inference made from a passage must be:",o:["Supported by the text","A personal opinion","The longest choice","A direct quotation only"],a:0,e:"A valid inference is a reasonable conclusion supported by textual evidence. (Choice A.)"},
    {q:"A study reports a margin of error of plus or minus 3 points. If the sample result is 52, which range is reasonable?",o:["3 to 52","49 to 55","52 to 55","55 to 58"],a:1,e:"Subtract and add 3: 52 - 3 = 49 and 52 + 3 = 55. (Choice B.)"}
  ],
  "Expression of Ideas":[
    {q:"Which transition best shows a contrast between two ideas?",o:["For example","However","Therefore","Similarly"],a:1,e:"However signals a contrast or change in direction. (Choice B.)"},
    {q:"A student wants to emphasize that a discovery was unexpected. Which transition is best?",o:["As a result","Surprisingly","In addition","For instance"],a:1,e:"Surprisingly directly signals that the result was unexpected. (Choice B.)"},
    {q:"A paragraph lists three benefits of exercise. Which sentence best concludes it?",o:["Exercise has many benefits for health.","The gym opened last Tuesday.","Some people prefer tea.","The study used a small sample."],a:0,e:"The first choice reinforces the paragraph's stated purpose and summarizes its focus. (Choice A.)"}
  ],
  "Standard English Conventions":[
    {q:"While one requires oxygen and one does ______ aerobic and anaerobic respiration are both forms of cellular respiration. Which choice completes the text?",o:["not aerobic","not. Aerobic","not, aerobic","not; aerobic"],a:1,e:"The first clause ends after 'not'; a period correctly begins the new sentence with 'Aerobic.' (Choice B.)"},
    {q:"Emperor Ashoka established the sanctity of animal ______ the just treatment of the elderly, and the abolition of the slave trade.",o:["life","life;","life:","life,"],a:3,e:"The items form a series, so a comma follows 'life.' (Choice D.)"},
    {q:"Choose the correct verb: The collection of rare books ______ in a climate-controlled room.",o:["are kept","were kept","is kept","have kept"],a:2,e:"The subject is singular: collection. The correct verb is 'is kept.' (Choice C.)"}
  ]
};
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fileUrl = (path) => encodeURI(path.split("\\").join("/"));
function choiceExplanation(item, index) {
  if (item.choiceNotes && item.choiceNotes[index]) return item.choiceNotes[index];
  const label = String.fromCharCode(65 + index);
  const rationale = String(item.e || "");
  const match = rationale.match(new RegExp(`Choice ${label} is (?:correct|incorrect)(?: and may result from conceptual errors)?\\.?\\s*(.*?)(?=Choice [A-D] is|$)`, "is"));
  const explanation = match && match[1].trim() ? match[1] : index === item.a && rationale ? rationale.split(/(?<=[.!?])\s+/)[0] : "";
  const cleaned = explanation.replace(/\s+/g, " ").trim();
  if (cleaned && !/interpretation of\s*,?\s*not\s*\./i.test(cleaned) && !/\bof\s*,\s*not\s*\./i.test(cleaned)) return cleaned;
  if (index !== item.a && /interpretation/i.test(rationale)) return `This choice describes "${item.o[index]}" rather than the quantity or term represented by the equation.`;
  if (index === item.a && rationale) {
    const firstSentence = rationale.split(/(?<=[.!?])\s+/)[0].replace(/\s+/g, " ").trim();
    if (firstSentence && !/interpretation of\s*,?\s*not\s*\./i.test(firstSentence)) return firstSentence;
    return "This choice matches the information given and directly answers what the question asks.";
  }
  if (index === item.a) return "This choice matches the information given and directly answers what the question asks.";
  return "This choice does not match the question's condition, relationship, or requested quantity.";
}

function repairExtractedQuestion(item) {
  if (item.id === "89541f9b") {
    return {
      ...item,
      q: "Which of the following ordered pairs (x, y) satisfies the inequality 5x - 3y < 4? 1. (1, 1)  2. (2, 5)  3. (3, 2)",
      o: ["I only", "II only", "I and II only", "I and III only"],
      a: 2,
      e: "Substitute each ordered pair into 5x - 3y < 4. For (1, 1), 5(1) - 3(1) = 2 < 4, so I works. For (2, 5), 5(2) - 3(5) = -5 < 4, so II works. For (3, 2), 5(3) - 3(2) = 9, which is not less than 4. Therefore, I and II only satisfy the inequality.",
      choiceNotes: {
        0: "II also satisfies the inequality, so I only is incomplete.",
        1: "I also satisfies the inequality, so II only is incomplete.",
        2: "Correct: statements I and II satisfy the inequality, while III does not.",
        3: "Statement III does not satisfy the inequality because 9 is not less than 4."
      }
    };
  }
  if (item.id === "5a7ab8e8") {
    return {
      ...item,
      q: "How many solutions does the given equation 66x = 66x have?",
      o: ["Exactly one", "Exactly two", "Infinitely many", "Zero"],
      a: 2,
      e: "Both sides of the equation are identical, so 66x = 66x is true for every value of x. Therefore, the equation has infinitely many solutions.",
      choiceNotes: {
        0: "There is not just one solution; every value of x satisfies the equation.",
        1: "There are more than two solutions because every value of x works.",
        2: "Correct: the equation is an identity, so it has infinitely many solutions.",
        3: "The equation is not contradictory; both sides are equal for every x."
      }
    };
  }
  if (item.id === "7d6928bd") {
    return {
      ...item,
      q: "A cleaning service that cleans both offices and homes can clean at most 14 places per day. Which inequality represents this situation, where f is the number of offices and h is the number of homes?",
      o: ["f + h ≤ 14", "f + h ≥ 14", "f - h ≤ 14", "f - h ≥ 14"],
      a: 0,
      e: "The total number of places cleaned is f + h. Since the service can clean at most 14 places per day, f + h ≤ 14.",
      choiceNotes: {
        0: "Correct: f + h counts all places, and at most 14 means ≤ 14.",
        1: "The inequality direction is reversed; at most means ≤.",
        2: "The total number of places is found by adding offices and homes, not subtracting.",
        3: "Both the operation and inequality direction are incorrect."
      }
    };
  }
  if (item.id === "b64e2c7f") {
    return {
      ...item,
      q: "Monarch butterflies can fly only with a body temperature of at least 55.0 degrees Fahrenheit (°F). If a monarch butterfly's body temperature is 51.3°F, what is the minimum increase needed in its body temperature, in °F, so that it can fly?",
      o: ["1.3", "3.7", "5.0", "6.3"],
      a: 1,
      e: "The butterfly needs to reach at least 55.0°F and currently has a temperature of 51.3°F. The minimum increase is 55.0 - 51.3 = 3.7°F.",
      choiceNotes: {
        0: "This does not increase 51.3°F enough to reach 55.0°F.",
        1: "Correct: 51.3 + 3.7 = 55.0°F.",
        2: "An increase of 5.0°F would work, but it is not the minimum increase.",
        3: "This is larger than the minimum needed."
      }
    };
  }
  if (item.id === "f01ef454") {
    return {
      ...item,
      q: "A geologist estimates that the volume of a slab of granite is greater than 12.7 cubic feet but less than 15.7 cubic feet. The geologist also estimates that the slab of granite weighs 165 pounds per cubic foot of volume. Which inequality represents this situation, where x represents the estimated total weight, in pounds, of the slab of granite?",
      o: ["165 - 15.7 < x < 165 - 12.7", "165 + 12.7 < x < 165 + 15.7", "165(12.7) < x < 165(15.7)", "165/15.7 < x < 165/12.7"],
      a: 2,
      e: "The total weight equals volume multiplied by 165 pounds per cubic foot. Since the volume is between 12.7 and 15.7 cubic feet, x is between 165(12.7) and 165(15.7).",
      choiceNotes: {
        0: "The weight is found by multiplication, not subtraction.",
        1: "The weight is found by multiplication, not addition.",
        2: "Correct: multiplying both volume bounds by 165 gives 165(12.7) < x < 165(15.7).",
        3: "The weight is found by multiplication, not division."
      }
    };
  }
  if (item.id === "e744499e") {
    return {
      ...item,
      q: "An elementary school teacher is ordering x workbooks and y sets of flash cards for a math class. The teacher must order at least 20 items, but the total cost of the order must not be over $80. If the workbooks cost $3 each and the flash cards cost $4 per set, which of the following systems of inequalities models this situation?",
      o: [
        "x + y ≥ 20; 3x + 4y ≤ 80",
        "x + y ≥ 20; 3x + 4y ≥ 80",
        "3x + 4y ≤ 20; x + y ≥ 80",
        "x + y ≤ 20; 3x + 4y ≥ 80"
      ],
      a: 0,
      e: "The teacher must order at least 20 total items, so x + y ≥ 20. The total cost is 3x + 4y and must not exceed $80, so 3x + 4y ≤ 80.",
      choiceNotes: {
        0: "Correct: at least 20 items means ≥ 20, and a cost not over $80 means ≤ 80.",
        1: "The cost inequality is reversed; the total cost must be at most $80.",
        2: "This uses the cost inequality with 20 and the item-count inequality with 80.",
        3: "Both inequality directions do not match the stated requirements."
      }
    };
  }
  if (item.id === "2869fe95") {
    return {
      ...item,
      q: "For a 3-week period in a town in Illinois, the lowest recorded temperature was 31 degrees Fahrenheit (°F) and the highest recorded temperature was 67°F. Which inequality is true for any recorded temperature t, in °F, in this town for this 3-week period?",
      o: ["t ≥ 98", "t ≥ 67", "31 ≤ t ≤ 67", "t ≤ 31"],
      a: 2,
      e: "Every recorded temperature was at least the lowest temperature, 31°F, and at most the highest temperature, 67°F. Therefore, 31 ≤ t ≤ 67.",
      choiceNotes: {
        0: "98 is the sum of 31 and 67, not the interval of possible temperatures.",
        1: "This only states that t is at least 67 and excludes temperatures below 67.",
        2: "Correct: every temperature is between 31°F and 67°F, inclusive.",
        3: "This only states that t is at most 31 and excludes temperatures above 31."
      }
    };
  }
  if (item.id === "c9355dec") {
    return {
      ...item,
      q: "The shaded region shown represents the solutions to which inequality?",
      o: ["y ≥ (2/3)x - 6", "y ≥ (2/3)x + 6", "y ≥ (2/3)x - 9", "y ≥ (2/3)x + 9"],
      a: 0,
      graphMarkup: `<div class="question-visual" role="img" aria-label="Coordinate plane with a solid diagonal boundary line and a shaded region above it"><svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="q44-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#b8c3c3" stroke-width="1"/></pattern></defs><rect x="34" y="12" width="352" height="264" fill="#fbfcfc"/><rect x="34" y="12" width="352" height="264" fill="url(#q44-grid)"/><polygon points="34,252 34,12 386,12 386,92" fill="#aeb5b5" opacity=".8"/><line x1="34" y1="252" x2="386" y2="92" stroke="#18252b" stroke-width="4"/><line x1="34" y1="132" x2="398" y2="132" stroke="#18252b" stroke-width="2"/><line x1="202" y1="276" x2="202" y2="8" stroke="#18252b" stroke-width="2"/><path d="M398 132l-10-5v10zM202 8l-5 10h10z" fill="#18252b"/><text x="393" y="125" font-size="16" font-style="italic" fill="#18252b">x</text><text x="210" y="18" font-size="16" font-style="italic" fill="#18252b">y</text><text x="194" y="149" font-size="13" fill="#18252b">0</text><text x="278" y="149" font-size="13" fill="#18252b">4</text><text x="326" y="149" font-size="13" fill="#18252b">6</text><text x="374" y="149" font-size="13" fill="#18252b">8</text><text x="183" y="38" font-size="13" fill="#18252b">5</text><text x="183" y="86" font-size="13" fill="#18252b">3</text><text x="179" y="181" font-size="13" fill="#18252b">-2</text><text x="179" y="229" font-size="13" fill="#18252b">-6</text></svg></div>`,
      e: "The boundary line has slope 2/3 and y-intercept -6, so its equation is y = (2/3)x - 6. Because the shaded region is above the solid boundary line, the inequality is y ≥ (2/3)x - 6.",
      choiceNotes: {
        0: "Correct: the line crosses the y-axis at -6, has slope 2/3, and the shaded region is above the line.",
        1: "The y-intercept is 6, but the graph's line crosses the y-axis at -6.",
        2: "The graph's y-intercept is -6, not -9.",
        3: "The graph's y-intercept is -6, not 9."
      }
    };
  }
  if (item.id === "84d0d07e") {
    return {
      ...item,
      q: "A clothing store is having a sale on shirts and pants. During the sale, the cost of each shirt is $15 and the cost of each pair of pants is $25. Geoff can spend at most $120 at the store. If Geoff buys s shirts and p pairs of pants, which of the following must be true?",
      o: ["15s + 25p ≤ 120", "15s + 25p ≥ 120", "25s + 15p ≤ 120", "25s + 15p ≥ 120"],
      a: 0,
      e: "The shirts cost 15s dollars and the pants cost 25p dollars, so the total cost is 15s + 25p. Since Geoff can spend at most $120, the total must be less than or equal to 120.",
      choiceNotes: {
        0: "Correct: 15s + 25p is the total cost, and at most $120 means ≤ 120.",
        1: "The inequality direction is reversed; at most means ≤, not ≥.",
        2: "The shirt and pants prices are assigned to the wrong variables.",
        3: "Both the prices are assigned incorrectly and the inequality direction is reversed."
      }
    };
  }
  if (item.id === "915463e0") {
    return {
      ...item,
      q: "Normal body temperature for an adult is between 97.8°F and 99°F, inclusive. If Kevin, an adult male, has a body temperature that is considered to be normal, which of the following could be his body temperature?",
      o: ["96.7°F", "97.6°F", "97.9°F", "99.7°F"],
      a: 2,
      e: "A normal temperature must be at least 97.8°F and at most 99°F. Of the choices, only 97.9°F is within that inclusive range.",
      choiceNotes: {
        0: "96.7°F is below the minimum of 97.8°F.",
        1: "97.6°F is below the minimum of 97.8°F.",
        2: "Correct: 97.9°F is between 97.8°F and 99°F.",
        3: "99.7°F is above the maximum of 99°F."
      }
    };
  }
  if (item.id === "59a49431") {
    return {
      ...item,
      q: "The shaded region shown represents solutions to an inequality. Which ordered pair (x, y) is a solution to this inequality?",
      o: ["(0, -4)", "(0, 4)", "(-4, 0)", "(4, 0)"],
      a: 3,
      graphMarkup: `<div class="question-visual" role="img" aria-label="Coordinate plane with a shaded region to the right of a descending boundary line"><svg viewBox="0 0 420 270" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="q105-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="#b8c3c3" stroke-width="1"/></pattern></defs><rect x="34" y="12" width="352" height="240" fill="#fbfcfc"/><rect x="34" y="12" width="352" height="240" fill="url(#q105-grid)"/><polygon points="226,12 386,12 386,252 296,252" fill="#aeb5b5" opacity=".8"/><line x1="226" y1="12" x2="296" y2="252" stroke="#18252b" stroke-width="4"/><line x1="34" y1="132" x2="398" y2="132" stroke="#18252b" stroke-width="2"/><line x1="202" y1="252" x2="202" y2="8" stroke="#18252b" stroke-width="2"/><path d="M398 132l-10-5v10zM202 8l-5 10h10z" fill="#18252b"/><text x="393" y="125" font-size="16" font-style="italic" fill="#18252b">x</text><text x="210" y="18" font-size="16" font-style="italic" fill="#18252b">y</text><text x="194" y="149" font-size="13" fill="#18252b">0</text><text x="278" y="149" font-size="13" fill="#18252b">4</text><text x="326" y="149" font-size="13" fill="#18252b">6</text><text x="374" y="149" font-size="13" fill="#18252b">8</text><text x="183" y="38" font-size="13" fill="#18252b">8</text><text x="183" y="86" font-size="13" fill="#18252b">4</text><text x="179" y="181" font-size="13" fill="#18252b">-2</text><text x="179" y="229" font-size="13" fill="#18252b">-6</text></svg></div>`,
      e: "The shaded region is to the right of the boundary line. Of the choices, (4, 0) lies in the shaded region, so it is a solution.",
      choiceNotes: {
        0: "(0, -4) lies to the left of the boundary line and is outside the shaded region.",
        1: "(0, 4) lies to the left of the boundary line and is outside the shaded region.",
        2: "(-4, 0) lies to the left of the boundary line and is outside the shaded region.",
        3: "Correct: (4, 0) lies in the shaded region."
      }
    };
  }
  if (item.id === "e006209c") {
    return {
      ...item,
      q: "A geologist needs to collect at least 67 samples of lava from a volcano. If the geologist has already collected 63 samples from the volcano, what is the minimum number of additional samples the geologist needs to collect?",
      o: ["130", "63", "4", "0"],
      a: 2,
      e: "The geologist needs at least 67 samples and already has 63. The minimum additional number is 67 - 63 = 4.",
      choiceNotes: {
        0: "This adds the target and current totals instead of finding the difference.",
        1: "This is the number of samples already collected, not the number still needed.",
        2: "Correct: 63 + 4 = 67, so 4 additional samples are needed.",
        3: "The geologist needs 4 more samples to reach 67."
      }
    };
  }
  if (item.id === "86f7483f") {
    return {
      ...item,
      q: "During spring migration, a dragonfly traveled a minimum of 1,510 miles and a maximum of 4,130 miles between stopover locations. Which inequality represents this situation, where d is a possible distance, in miles, this dragonfly traveled between stopover locations during spring migration?",
      o: ["d ≤ 1,510", "1,510 ≤ d ≤ 4,130", "d ≥ 4,130", "4,130 ≤ d ≤ 5,640"],
      a: 1,
      e: "A minimum of 1,510 means d is at least 1,510, and a maximum of 4,130 means d is at most 4,130. Therefore, 1,510 ≤ d ≤ 4,130.",
      choiceNotes: {
        0: "This only gives an upper limit and does not require d to be at least 1,510.",
        1: "Correct: d is between the minimum of 1,510 and maximum of 4,130, inclusive.",
        2: "This only gives a lower limit and does not set the maximum at 4,130.",
        3: "The interval starts at the wrong endpoint and extends beyond the stated maximum."
      }
    };
  }
  if (item.id === "df32b09c") {
    return {
      ...item,
      q: "Tom scored 85, 78, and 98 on his first three exams in history class. Solving which inequality gives the score, G, on Tom's fourth exam that will result in a mean score on all four exams of at least 90?",
      o: [
        "90 - (85 + 78 + 98) ≤ 4G",
        "4G + 85 + 78 + 98 ≥ 360",
        "(G + 85 + 78 + 98)/4 ≥ 90",
        "(85 + 78 + 98)/4 ≥ 90 - 4G"
      ],
      a: 2,
      e: "The mean of the four scores is (G + 85 + 78 + 98)/4. Requiring a mean of at least 90 gives (G + 85 + 78 + 98)/4 ≥ 90.",
      choiceNotes: {
        0: "This does not correctly express the mean of all four exam scores.",
        1: "This is algebraically equivalent to the correct inequality after multiplying both sides by 4, but choice C shows the mean condition directly and is the keyed answer.",
        2: "Correct: the sum of all four scores is divided by 4 and is at least 90.",
        3: "This leaves G out of the mean and does not represent the fourth exam score correctly."
      }
    };
  }
  if (item.id === "68f2cbaf") {
    return {
      ...item,
      q: "Ty set a goal to walk at least 24 kilometers every day to prepare for a multiday hike. On a certain day, Ty plans to walk at an average speed of 4 kilometers per hour. What is the minimum number of hours Ty must walk on that day to fulfill the daily goal?",
      o: ["4", "6", "20", "24"],
      a: 1,
      e: "At 4 kilometers per hour, the distance Ty walks in h hours is 4h. To walk at least 24 kilometers, 4h ≥ 24. Dividing by 4 gives h ≥ 6, so the minimum is 6 hours.",
      choiceNotes: {
        0: "Four hours would result in 16 kilometers, which is less than 24.",
        1: "Correct: 4 × 6 = 24 kilometers, so 6 hours is the minimum.",
        2: "Twenty hours is much more time than necessary to reach 24 kilometers.",
        3: "Twenty-four is the distance goal, not the number of hours."
      }
    };
  }
  if (item.id === "4a090a46") {
    return {
      ...item,
      q: "Julissa needs at least 100 hours of flight time to get her private pilot certification. If Julissa already has 86 hours of flight time, what is the minimum number of additional hours of flight time Julissa needs to get her private pilot certification?",
      o: ["14", "76", "86", "186"],
      a: 0,
      e: "Julissa needs at least 100 total hours and already has 86 hours. Subtracting gives 100 - 86 = 14 additional hours.",
      choiceNotes: {
        0: "Correct: 86 + 14 = 100 hours.",
        1: "This subtracts 24 from 100 instead of subtracting Julissa's 86 existing hours.",
        2: "This is the number of hours Julissa already has, not the additional hours needed.",
        3: "This adds 100 and 86 instead of finding the difference."
      }
    };
  }
  if (item.id === "ee439cff") {
    return {
      ...item,
      q: "On a car trip, Rhett and Jessica each drove for part of the trip, and the total distance they drove was under 220 miles. Rhett drove at an average speed of 35 miles per hour (mph), and Jessica drove at an average speed of 40 mph. Which of the following inequalities represents this situation, where r is the number of hours Rhett drove and j is the number of hours Jessica drove?",
      o: ["35r + 40j > 220", "35r + 40j < 220", "40r + 35j > 220", "40r + 35j < 220"],
      a: 1,
      e: "Rhett drove 35r miles and Jessica drove 40j miles. Their combined distance is 35r + 40j, and under 220 miles is represented by < 220.",
      choiceNotes: {
        0: "The speeds are assigned correctly, but > 220 means over 220 miles rather than under 220.",
        1: "Correct: 35r + 40j is the total distance, and under 220 means < 220.",
        2: "The speeds are assigned to the wrong drivers, and the inequality direction is wrong.",
        3: "The speeds are assigned to the wrong drivers."
      }
    };
  }
  if (item.id === "c50ede6d") {
    return {
      ...item,
      q: "The total cost, in dollars, to rent a surfboard consists of a $25 service fee and a $10 per hour rental fee. A person rents a surfboard for t hours and intends to spend a maximum of $75 to rent the surfboard. Which inequality represents this situation?",
      o: ["10t ≤ 75", "10 + 25t ≤ 75", "25t ≤ 75", "25 + 10t ≤ 75"],
      a: 3,
      e: "The total cost is the $25 service fee plus $10 for each of t hours, or 25 + 10t. Since the person will spend a maximum of $75, the total cost is at most 75: 25 + 10t ≤ 75.",
      choiceNotes: {
        0: "This includes only the hourly rental fee and leaves out the $25 service fee.",
        1: "The service fee and hourly fee are assigned incorrectly.",
        2: "This multiplies the service fee by the number of hours and leaves out the hourly fee.",
        3: "Correct: $25 is the fixed service fee, $10t is the hourly cost, and the total is at most $75."
      }
    };
  }
  if (item.id === "2c121b25") {
    return {
      ...item,
      q: "Valentina bought two containers of beads. In the first container 30% of the beads are red, and in the second container 70% of the beads are red. Together, the containers have at least 400 red beads. Which inequality shows this relationship, where x is the total number of beads in the first container and y is the total number of beads in the second container?",
      o: ["0.3x + 0.7y ≥ 400", "0.7x + 0.3y ≤ 400", "x/3 + y/7 ≤ 400", "30x + 70y ≥ 400"],
      a: 0,
      e: "The first container contributes 0.3x red beads and the second contributes 0.7y red beads. Since there are at least 400 red beads altogether, 0.3x + 0.7y ≥ 400.",
      choiceNotes: {
        0: "Correct: 0.3x and 0.7y represent the red beads, and at least 400 means ≥ 400.",
        1: "The percentages are assigned to the wrong containers, and ≤ means at most rather than at least.",
        2: "The fractions do not represent 30% and 70%, and the inequality direction is wrong.",
        3: "The percentages must be written as decimals when multiplying by the total numbers of beads."
      }
    };
  }
  if (item.id === "842cec4d") {
    return {
      ...item,
      q: "During a portion of a flight, a small airplane's cruising speed varied between 150 miles per hour and 170 miles per hour. Which inequality best represents this situation, where s is the cruising speed, in miles per hour, during this portion of the flight?",
      o: ["s ≤ 20", "s ≤ 150", "s ≤ 170", "150 ≤ s ≤ 170"],
      a: 3,
      e: "The cruising speed was at least 150 miles per hour and at most 170 miles per hour. Therefore, s must be between 150 and 170, inclusive: 150 ≤ s ≤ 170.",
      choiceNotes: {
        0: "20 is the difference between the endpoints, not the range of possible speeds.",
        1: "This only gives an upper limit of 150 and excludes speeds between 150 and 170.",
        2: "This gives an upper limit but does not require the speed to be at least 150.",
        3: "Correct: the speed is at least 150 and at most 170."
      }
    };
  }
  if (item.id === "cfe67646") {
    return {
      ...item,
      q: "The point (8, 2) in the xy-plane is a solution to which of the following systems of inequalities?",
      o: ["x > 0; y > 0", "x > 0; y < 0", "x < 0; y > 0", "x < 0; y < 0"],
      a: 0,
      e: "The point has x-coordinate 8 and y-coordinate 2. Both coordinates are positive, so it satisfies x > 0 and y > 0.",
      choiceNotes: {
        0: "Correct: 8 > 0 and 2 > 0.",
        1: "The point's y-coordinate is 2, which is greater than 0, not less than 0.",
        2: "The point's x-coordinate is 8, which is greater than 0, not less than 0.",
        3: "Both coordinates of (8, 2) are positive, so neither inequality is true."
      }
    };
  }
  if (item.id === "45bba652") {
    return {
      ...item,
      q: "If (6/7)p + 18 = 54, what is the value of 7p?",
      responseType: "number",
      answer: "294",
      o: [],
      a: null,
      e: "Subtract 18 from both sides: (6/7)p = 36. Multiply both sides by 7/6 to get p = 42. Therefore, 7p = 7(42) = 294."
    };
  }
  if (item.id === "628300a9") {
    return {
      ...item,
      q: "A science teacher is preparing the 5 stations of a science laboratory. Each station will have either Experiment A materials or Experiment B materials, but not both. Experiment A requires 6 teaspoons of salt, and Experiment B requires 4 teaspoons of salt. If x is the number of stations that will be set up for Experiment A and the remaining stations will be set up for Experiment B, which of the following expressions represents the total number of teaspoons of salt required?",
      o: ["5x", "10x", "2x + 20", "10x + 20"],
      a: 2,
      e: "Experiment A uses 6 teaspoons for each of x stations. The remaining 5 - x stations use 4 teaspoons each. The total is 6x + 4(5 - x) = 6x + 20 - 4x = 2x + 20.",
      choiceNotes: {
        0: "This does not account for the different salt amounts required by Experiments A and B.",
        1: "This incorrectly treats all 5 stations as if they used the same amount of salt.",
        2: "Correct: 6x + 4(5 - x) simplifies to 2x + 20.",
        3: "The expression does not correctly combine the number of Experiment A and Experiment B stations."
      }
    };
  }
  if (item.id === "f5ff91b2") {
    return {
      ...item,
      q: "If (x - 5)/7 = (x - 5)/9, the value of x - 5 is between which of the following pairs of values?",
      o: ["-9 and -7", "-3 and 3", "4.5 and 5.5", "6.75 and 9.25"],
      a: 1,
      e: "Because the denominators 7 and 9 are different, the equality can hold only when the common numerator x - 5 equals 0. Zero is between -3 and 3.",
      choiceNotes: {
        0: "Zero is not between -9 and -7.",
        1: "Correct: x - 5 = 0, and 0 is between -3 and 3.",
        2: "Zero is not between 4.5 and 5.5.",
        3: "Zero is not between 6.75 and 9.25."
      }
    };
  }
  if (item.id === "3f8a701b") {
    return {
      ...item,
      q: "The equation 9x + 5 = a(x + b), where a and b are constants, has no solutions. Which of the following must be true? I. a = 9  II. b = 5  III. b ≠ 5/9",
      o: ["None", "I only", "I and II only", "I and III only"],
      a: 3,
      e: "For no solutions, the x-coefficients must match so that the variable terms cancel: a = 9. Then the equation becomes 9x + 5 = 9x + 9b. For it to be contradictory, 5 ≠ 9b, which means b ≠ 5/9. Statement II is not required.",
      choiceNotes: {
        0: "Statements I and III must be true, so None is not correct.",
        1: "Statement I is necessary, but statement III is also necessary.",
        2: "Statement II is not required; b can be any value except 5/9.",
        3: "Correct: I gives matching x-coefficients, and III prevents the resulting contradiction from becoming an identity."
      }
    };
  }
  if (item.id === "0393ba15") {
    return {
      ...item,
      q: "How many solutions does the given equation -49x = -98x have?",
      o: ["Zero", "Exactly one", "Exactly two", "Infinitely many"],
      a: 1,
      e: "Add 98x to both sides to get 49x = 0, so x = 0. Therefore, the equation has exactly one solution.",
      choiceNotes: {
        0: "The equation is consistent when x = 0, so it does have a solution.",
        1: "Correct: -49x = -98x simplifies to x = 0, giving exactly one solution.",
        2: "A linear equation of this form cannot have exactly two solutions.",
        3: "The two sides are not identical, so the equation is not true for every value of x."
      }
    };
  }
  if (item.id === "aee9fd2d") {
    return {
      ...item,
      q: "If (x + 6)/3 = (x + 6)/13, the value of x + 6 is between which of the following pairs of values?",
      o: ["-7 and -3", "-2 and 2", "2 and 7", "8 and 13"],
      a: 1,
      e: "Because the denominators 3 and 13 are different, the equality can hold only when the common numerator x + 6 equals 0. Zero is between -2 and 2.",
      choiceNotes: {
        0: "Zero is not between -7 and -3.",
        1: "Correct: x + 6 = 0, and 0 is between -2 and 2.",
        2: "Zero is not between 2 and 7.",
        3: "Zero is not between 8 and 13."
      }
    };
  }
  if (item.id === "153ee763") {
    return {
      ...item,
      q: "Given 3(kx + 13) = (48/17)x + 36, where k is a constant, if the equation has no solution, what is the value of k?",
      responseType: "number",
      answer: "16/17",
      o: [],
      a: null,
      e: "Expand the left side: 3kx + 39 = (48/17)x + 36. For the equation to have no solution, the x-coefficients must be equal while the constants remain different. Set 3k = 48/17, which gives k = 16/17. The constants 39 and 36 are different, so the equation is contradictory and has no solution."
    };
  }
  if (item.id === "0cb57740") {
    return {
      ...item,
      q: "Each side of a 30-sided polygon has one of three lengths. The number of sides with length 8 centimeters is 5 times the number of sides n with length 3 centimeters. There are 6 sides with length 4 centimeters. Which equation must be true for the value of n?",
      o: ["5n + 6 = 30", "6n + 6 = 30", "8n + 3n + 4n = 30", "8(5n) + 3n + 4(6) = 30"],
      a: 1,
      e: "The polygon has 5n sides of length 8 cm, n sides of length 3 cm, and 6 sides of length 4 cm. Since there are 30 sides total, 5n + n + 6 = 30, which simplifies to 6n + 6 = 30.",
      choiceNotes: {
        0: "This choice represents the 5n sides and 6 fixed sides but omits the n sides with length 3 cm.",
        1: "Correct: 5n + n + 6 = 30 simplifies to 6n + 6 = 30.",
        2: "This incorrectly uses the side lengths as coefficients instead of counting the number of sides.",
        3: "This calculates total length rather than the total number of sides."
      }
    };
  }
  if (item.id === "69f609b2") {
    return {
      ...item,
      q: "How many solutions does the equation 12(x - 3) = -3(x + 12) have?",
      o: ["Exactly one", "Exactly two", "Infinitely many", "Zero"],
      a: 0,
      e: "Expand both sides: 12x - 36 = -3x - 36. Adding 3x gives 15x - 36 = -36, so 15x = 0 and x = 0. Therefore, the equation has exactly one solution.",
      choiceNotes: {
        0: "Correct: simplifying gives 15x = 0, so x = 0 is the one solution.",
        1: "A linear equation like this cannot have exactly two solutions.",
        2: "The equation is not an identity; solving it produces the single value x = 0.",
        3: "The equation is consistent because x = 0 satisfies both sides."
      }
    };
  }
  if (item.id === "25e1cfed") {
    return {
      ...item,
      q: "How many solutions does the equation 10(15x - 9) = -15(6 - 10x) have?",
      o: ["Exactly one", "Exactly two", "Infinitely many", "Zero"],
      a: 2,
      e: "Expanding both sides gives 150x - 90 = -90 + 150x. The two sides are identical for every value of x, so the equation has infinitely many solutions.",
      choiceNotes: {
        0: "There is not one isolated value of x; every value of x makes the equation true.",
        1: "A linear equation cannot have exactly two solutions here; the simplified equation is an identity.",
        2: "Correct: both sides simplify to 150x - 90, so every value of x is a solution.",
        3: "The equation is not contradictory; both sides simplify to the same expression."
      }
    };
  }
  if (item.id === "b7e6394d") {
    return {
      ...item,
      q: "Alan drives an average of 100 miles each week. His car can travel an average of 25 miles per gallon of gasoline. Alan would like to reduce his weekly expenditure on gasoline by $5. Assuming gasoline costs $4 per gallon, which equation can Alan use to determine how many fewer average miles, m, he should drive each week?",
      o: ["(25/4)m = 95", "(25/4)m = 5", "(4/25)m = 95", "(4/25)m = 5"],
      a: 3,
      e: "Each gallon costs $4 and covers 25 miles, so the cost per mile is 4/25 dollars. To save $5, the equation is (4/25)m = 5.",
      choiceNotes: {
        0: "This uses 25/4, which is miles per dollar rather than dollars per mile, and sets the result to 95 instead of the $5 savings.",
        1: "This uses 25/4, which is miles per dollar rather than dollars per mile.",
        2: "Although 4/25 is the correct cost per mile, setting it equal to 95 does not represent the desired $5 reduction.",
        3: "Correct: m miles cost (4/25)m dollars, and the desired savings is $5."
      }
    };
  }
  if (item.id === "38bf4e04") {
    return {
      ...item,
      q: "A factory makes 9-inch, 7-inch, and 4-inch concrete screws. During a certain day, the number of 9-inch concrete screws is 5 times the number n of 7-inch concrete screws, the number of 4-inch concrete screws is 22, and the factory makes 100 concrete screws total. Which equation represents this situation?",
      o: ["9(5n) + 7n + 4(22) = 100", "9n + 7n + 4n = 100", "5n + 22 = 100", "6n + 22 = 100"],
      a: 3,
      e: "The factory makes 5n screws of the 9-inch type, n screws of the 7-inch type, and 22 screws of the 4-inch type. The total is 5n + n + 22 = 100, which simplifies to 6n + 22 = 100.",
      choiceNotes: {
        0: "This multiplies screw lengths by counts, finding total inches rather than the number of screws.",
        1: "This treats the number of each screw type as n and does not use the fact that the 9-inch count is 5n.",
        2: "This omits the n 7-inch screws from the total.",
        3: "Correct: 5n screws plus n screws plus 22 screws gives 6n + 22 = 100."
      }
    };
  }
  if (item.id === "f14484a5") {
    return {
      ...item,
      q: "A manufacturing plant makes 10-inch, 9-inch, and 7-inch frying pans. During a certain day, the number of 10-inch frying pans is 4 times the number n of 9-inch frying pans, the number of 7-inch frying pans is 10, and the plant makes 100 frying pans total. Which equation represents this situation?",
      o: ["10(4n) + 9n + 7(10) = 100", "10n + 9n + 7n = 100", "4n + 10 = 100", "5n + 10 = 100"],
      a: 3,
      e: "The number of pans is counted by type: 4n 10-inch pans, n 9-inch pans, and 10 7-inch pans. Their total is 4n + n + 10 = 100, which simplifies to 5n + 10 = 100.",
      choiceNotes: {
        0: "This multiplies the pan sizes by the counts, finding total inches rather than the total number of pans.",
        1: "This uses the pan sizes as coefficients instead of the number of pans in each group.",
        2: "This omits the n 9-inch pans and does not represent all three pan groups.",
        3: "Correct: 4n pans plus n pans plus 10 pans gives 5n + 10 = 100."
      }
    };
  }
  if (item.id === "8c515062") {
    return {
      ...item,
      q: "A candle is made of 17 ounces of wax. When the candle is burning, the amount of wax in the candle decreases by 1 ounce every 4 hours. If 6 ounces of wax remain in this candle, for how many hours has it been burning?",
      o: ["3", "6", "24", "44"],
      a: 3,
      e: "The candle used 17 - 6 = 11 ounces of wax. At 1 ounce every 4 hours, 11 ounces take 11 × 4 = 44 hours.",
      choiceNotes: {
        0: "This does not account for the 11 ounces of wax used or the rate of 1 ounce every 4 hours.",
        1: "This is the amount of wax remaining, not the number of hours the candle has burned.",
        2: "This uses 6 ounces remaining as the elapsed amount and does not calculate the 11 ounces consumed.",
        3: "Correct: 11 ounces were used, and 11 × 4 = 44 hours."
      }
    };
  }
  if (item.id === "f60aa0dc") {
    return {
      ...item,
      q: "If 2(3t - 10) + t = 40 + 4t, what is the value of 3t?",
      responseType: "integer",
      answer: "60",
      o: [],
      a: null,
      e: "Distribute and combine like terms: 6t - 20 + t = 40 + 4t, so 7t - 20 = 40 + 4t. Subtract 4t and add 20 to get 3t = 60."
    };
  }
  if (item.id === "eafdbbbd") {
    return {
      ...item,
      q: "What value of x is the solution to the equation (1/3)(x + 6) - (1/2)(x + 6) = -8?",
      responseType: "integer",
      answer: "42",
      o: [],
      a: null,
      e: "Factor out x + 6: (1/3 - 1/2)(x + 6) = -8. Since 1/3 - 1/2 = -1/6, multiply both sides by -6 to get x + 6 = 48. Therefore, x = 42."
    };
  }
  if (item.id === "5ad9eff0") {
    return {
      ...item,
      q: "The width of a rectangular dance floor is w feet. The length of the floor is 6 feet longer than its width. Which expression represents the perimeter, in feet, of the dance floor in terms of w?",
      o: ["2w + 6", "4w + 12", "w^2 + 6", "w^2 + 6w"],
      a: 1,
      e: "The width is w and the length is w + 6. The perimeter is 2w + 2(w + 6) = 4w + 12.",
      choiceNotes: {
        0: "This adds only one width and one length instead of all four sides of the rectangle.",
        1: "Correct: P = 2w + 2(w + 6) = 4w + 12.",
        2: "Perimeter is found by adding side lengths, not multiplying w by itself.",
        3: "The expression incorrectly uses w^2 and does not represent the sum of the four sides."
      }
    };
  }
  if (item.id === "1ce51655") {
    return {
      ...item,
      q: "A bowl contains 20 ounces of water. When the bowl is uncovered, the amount of water in the bowl decreases by 1 ounce every 4 days. If 9 ounces of water remain in this bowl, for how many days has it been uncovered?",
      o: ["3", "7", "36", "44"],
      a: 3,
      e: "The bowl lost 20 - 9 = 11 ounces of water. At 1 ounce every 4 days, 11 ounces take 11 × 4 = 44 days.",
      choiceNotes: {
        0: "This uses 3 days without accounting for the 4 days required for each ounce of water lost.",
        1: "This is the number of ounces lost, not the number of days; each ounce takes 4 days.",
        2: "This does not account for all 11 ounces lost at a rate of 1 ounce every 4 days.",
        3: "Correct: 11 ounces were lost, and 11 × 4 = 44 days."
      }
    };
  }
  if (item.id === "40049d49") {
    return {
      ...item,
      q: "Given 2x + 16 = a(x + 8), where a is a constant, if the equation has infinitely many solutions, what is the value of a?",
      responseType: "integer",
      answer: "2",
      o: [],
      a: null,
      e: "For infinitely many solutions, both sides must be equivalent for every x. Expanding the right side gives ax + 8a. Matching the x-coefficients with 2x requires a = 2; the constants then also match because 8a = 16.",
      choiceNotes: {
        0: "If a = 1, the right side is x + 8, which does not match 2x + 16.",
        1: "Correct: matching the coefficient of x gives a = 2, and then a(x + 8) = 2x + 16.",
        2: "If a = 4, the right side is 4x + 32, which is not equivalent to 2x + 16.",
        3: "If a = 8, the right side is 8x + 64, which is not equivalent to 2x + 16."
      }
    };
  }
  if (item.id === "76f29fa5") {
    return {
      ...item,
      q: "The cost to rent a commercial fishing boat from a certain company is $950 for the first 2 hours and an additional $50 per hour for each hour after the first 2 hours. If the total cost to rent the boat for t hours, where t > 2, is $1,100, which equation represents this situation?",
      o: ["950(t - 2) + 50t = 1,100", "950(2t) + 50t = 1,100", "950 + 50(t - 2) = 1,100", "950 + 50(2t) = 1,100"],
      a: 2,
      e: "The first 2 hours cost a fixed $950. Since t is greater than 2, there are t - 2 additional hours, each costing $50. Therefore, the total cost is 950 + 50(t - 2) = 1,100.",
      choiceNotes: {
        0: "This multiplies the $950 fixed cost by t - 2, but $950 is charged once for the first 2 hours.",
        1: "This incorrectly multiplies the fixed $950 cost by 2t instead of charging it once.",
        2: "Correct: $950 covers the first 2 hours, and 50(t - 2) covers each additional hour.",
        3: "This uses 2t additional hours, but the number of hours after the first 2 is t - 2."
      }
    };
  }
  if (item.id === "ce314070") {
    return {
      ...item,
      q: "If 4x - 1/2 = -5, what is the value of 8x - 1?",
      o: ["2", "-9/8", "-5/2", "-10"],
      a: 3,
      e: "Add 1/2 to both sides: 4x = -9/2. Multiplying by 2 gives 8x = -9, so 8x - 1 = -10.",
      choiceNotes: {
        0: "This does not follow from the equation; the value of 8x - 1 is negative.",
        1: "This is the value of x, not the value of 8x - 1.",
        2: "This does not result from solving 4x - 1/2 = -5; the equation gives x = -9/8.",
        3: "Correct: 4x = -9/2, so 8x = -9 and 8x - 1 = -10."
      }
    };
  }
  if (item.id === "620abf36") {
    return {
      ...item,
      q: "If 5(x + 4) = 4(x + 4) + 29, what is the value of x + 4?",
      o: ["-4", "25", "29", "33"],
      a: 2,
      e: "Subtract 4(x + 4) from both sides: x + 4 = 29. Therefore, the value of x + 4 is 29.",
      choiceNotes: {
        0: "This would make x + 4 equal to -4, but subtracting 4(x + 4) from both sides directly gives x + 4 = 29.",
        1: "This is 29 - 4, but the expression being asked for is x + 4, which equals 29.",
        2: "Correct: 5(x + 4) - 4(x + 4) = 29 simplifies to x + 4 = 29.",
        3: "This adds 4 to 29 even though the question asks for x + 4, which is already isolated as 29."
      }
    };
  }
  if (item.id === "70e29454") {
    return {
      ...item,
      q: "Given a(3 - x) - b = -1 - 2x, where a and b are constants, if the equation has infinitely many solutions, what are the values of a and b?",
      o: ["a = 2 and b = 1", "a = 2 and b = 7", "a = -2 and b = 5", "a = -2 and b = -5"],
      a: 1,
      e: "Expand the left side: a(3 - x) - b = 3a - ax - b. For the equation to match -1 - 2x for every x, the x-coefficients must match, so -a = -2 and a = 2. Then the constants must match: 3(2) - b = -1, so b = 7.",
      choiceNotes: {
        0: "The value a = 2 is correct, but b = 1 gives 6 - 1 = 5 rather than the required constant -1.",
        1: "Correct: matching the x-coefficients gives a = 2, and matching the constants gives 6 - b = -1, so b = 7.",
        2: "If a = -2, then the coefficient of x on the left is 2, which does not match the coefficient -2 on the right.",
        3: "If a = -2, then the coefficient of x on the left is 2, not -2, so the equation cannot be true for every x."
      }
    };
  }
  if (item.id === "018a2704") {
    return {
      ...item,
      q: "If 46 = 16 + 2(x - 8), what is the value of 2(x - 8)?",
      o: ["16", "23", "30", "38"],
      a: 2,
      e: "Subtract 16 from both sides of the equation: 30 = 2(x - 8). Therefore, the value of 2(x - 8) is 30.",
      choiceNotes: {
        0: "This is the constant 16 from the equation, not the value of the entire expression 2(x - 8).",
        1: "This is the value of x after solving the equation, but the question asks for 2(x - 8).",
        2: "Correct: subtracting 16 from 46 gives 2(x - 8) = 30.",
        3: "This does not result from isolating 2(x - 8); 46 - 16 equals 30."
      }
    };
  }
  if (item.id === "12ee1edc") {
    return {
      ...item,
      q: "Given (b - 2)x = 8, if x is the solution to the equation above and the equation has no solution, what is the value of b?",
      o: ["2", "4", "6", "10"],
      a: 0,
      e: "If b - 2 is not zero, dividing both sides by b - 2 gives one solution for x. For the equation to have no solution, the coefficient of x must be zero, so b - 2 = 0 and b = 2.",
      choiceNotes: {
        0: "Correct: b = 2 makes the coefficient b - 2 equal to zero, leaving 0x = 8, which is impossible and therefore has no solution.",
        1: "If b = 4, the equation becomes 2x = 8, which has the solution x = 4.",
        2: "If b = 6, the equation becomes 4x = 8, which has the solution x = 2.",
        3: "If b = 10, the equation becomes 8x = 8, which has the solution x = 1."
      }
    };
  }
  if (item.id !== "7a5a74a6") return item;
  return {
    ...item,
    q: "Given 3(2x - 6) - 11 = 4(x - 3) + 6, if x is the solution to the equation above, what is the value of x - 3?",
    o: ["23/2", "17/2", "15/2", "-15/2"],
    a: 1,
    e: "Distribute and simplify: 6x - 18 - 11 = 4x - 12 + 6, so 6x - 29 = 4x - 6. Subtract 4x and add 29: 2x = 23, so x = 23/2. Therefore, x - 3 = 23/2 - 6/2 = 17/2.",
    choiceNotes: {
      0: "This is the value of x, but the question asks for x - 3.",
      1: "Correct: solving the equation gives x = 23/2, and subtracting 3 gives x - 3 = 17/2.",
      2: "This would be 15/2, but solving the equation gives x = 23/2; subtracting 3 gives 17/2.",
      3: "The solution x is positive, so subtracting 3 cannot produce -15/2."
    }
  };
}

const progressStorageKey = "sat-progress";
const defaultProgress = {goals:{studyMinutes:300, questions:200}, days:{}};
let progressState = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(progressStorageKey) || "null");
    return { ...defaultProgress, ...saved, goals:{...defaultProgress.goals, ...(saved?.goals || {})}, days:saved?.days || {} };
  } catch (error) {
    return {...defaultProgress};
  }
})();
let activeStudySession = null;

function localDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
function saveProgress() {
  localStorage.setItem(progressStorageKey, JSON.stringify(progressState));
}
function recordProgress({minutes = 0, questions = 0} = {}) {
  const key = localDateKey();
  const day = progressState.days[key] || {minutes:0, questions:0};
  day.minutes += Math.max(0, minutes);
  day.questions += Math.max(0, questions);
  progressState.days[key] = day;
  saveProgress();
  updateProgressDashboard();
}
function startStudySession(label) {
  if (!activeStudySession) activeStudySession = {label, startedAt:Date.now()};
}
function stopStudySession() {
  if (!activeStudySession) return;
  const minutes = (Date.now() - activeStudySession.startedAt) / 60000;
  activeStudySession = null;
  if (minutes > 0) recordProgress({minutes});
}
function weekProgress() {
  const days = Array.from({length:7}, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = localDateKey(date);
    return {key, label:new Intl.DateTimeFormat("en-US", {weekday:"short"}).format(date).slice(0, 1), ...(progressState.days[key] || {minutes:0, questions:0})};
  });
  return {days, minutes:days.reduce((sum, day) => sum + day.minutes, 0), questions:days.reduce((sum, day) => sum + day.questions, 0)};
}
function formatDuration(minutes) {
  const rounded = Math.max(0, Math.round(minutes));
  return rounded >= 60 ? `${Math.floor(rounded / 60)}h ${rounded % 60}m` : `${rounded}m`;
}
function updateProgressDashboard() {
  const summary = weekProgress();
  const goals = progressState.goals;
  const studyValue = $("#studyTimeValue");
  if (!studyValue) return;
  studyValue.innerHTML = summary.minutes >= 60 ? `${Math.floor(summary.minutes / 60)}<span>h</span> ${summary.minutes % 60}<span>m</span>` : `${summary.minutes}<span>m</span>`;
  $("#studyTimeProgress").style.width = `${Math.min(100, summary.minutes / goals.studyMinutes * 100)}%`;
  $("#studyTimeSummary").textContent = `Goal: ${formatDuration(goals.studyMinutes)} this week`;
  $("#questionsAnswered").textContent = summary.questions;
  $("#questionsGoalSummary").textContent = `Goal: ${goals.questions} this week`;
  $("#activityTotal").textContent = formatDuration(summary.minutes);
  const maxMinutes = Math.max(60, ...summary.days.map(day => day.minutes));
  $("#activityBars").innerHTML = summary.days.map(day => `<i style="height:${Math.max(2, day.minutes / maxMinutes * 100)}%" title="${day.label}: ${day.minutes} minutes"></i>`).join("");
  $("#activityDays").innerHTML = summary.days.map(day => `<span>${day.label}</span>`).join("");
  $("#questionBars").innerHTML = summary.days.map(day => `<i style="height:${Math.max(4, day.questions / Math.max(1, goals.questions / 7) * 100)}%"></i>`).join("");
}

function renderTopics(filter = "all") {
  $("#topicGrid").innerHTML = topics.map((t, i) => `<article class="topic-card ${filter !== "all" && t.subject !== filter ? "hidden" : ""}" data-topic="${escapeHtml(t.name)}" tabindex="0">
    <div class="topic-color" style="background:${t.color}"></div><span class="eyebrow">${subjectNames[t.subject].toUpperCase()}</span>
    <h3>${escapeHtml(t.name)}</h3><p>${escapeHtml(t.desc)}</p><footer><span>${t.count}</span><b>Open topic →</b></footer></article>`).join("");
  $$(".topic-card").forEach(card => { card.addEventListener("click", () => openTopic(card.dataset.topic)); card.addEventListener("keydown", e => { if (e.key === "Enter") openTopic(card.dataset.topic); }); });
}
function questionKey(item) {
  const normalize = value => String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
  return [
    normalize(item.difficulty || "Practice"),
    normalize(item.q),
    ...(Array.isArray(item.o) ? item.o.map(normalize) : []),
    normalize(item.answer ?? item.a)
  ].join("|");
}
function uniqueQuestions(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = questionKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function renderLessons(filter = "all") {
  $("#lessonGrid").innerHTML = topics.filter(t => filter === "all" || t.subject === filter).map(t => {
    const lesson = lessons[t.name];
    return `<article class="lesson-card" data-lesson="${escapeHtml(t.name)}"><div class="lesson-top"><span class="topic-color" style="background:${t.color}"></span><span class="eyebrow">${subjectNames[t.subject].toUpperCase()}</span></div><h2>${escapeHtml(t.name)}</h2><p class="lesson-hook">${escapeHtml(lesson.hook)}</p><div class="lesson-section"><strong>The core idea</strong><p>${escapeHtml(lesson.concept)}</p></div><div class="lesson-section"><strong>Use this process</strong><ol>${lesson.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol></div><div class="lesson-example"><span class="eyebrow">WORKED EXAMPLE</span><p>${escapeHtml(lesson.example)}</p></div><div class="lesson-trap"><b>Watch for:</b> ${escapeHtml(lesson.trap)}</div><div class="lesson-source"><span>Built from your folder</span><small>${escapeHtml(lesson.source || "Your SAT Prep worksheets and guides")}</small></div><button class="primary-button lesson-practice" data-open-topic="${escapeHtml(t.name)}">Practice this topic <span>→</span></button></article>`;
  }).join("");
  $$(".lesson-practice").forEach(b => b.addEventListener("click", () => openTopic(b.dataset.openTopic)));
}
function openTopic(name) {
  const t = topics.find(x => x.name === name); if (!t) return;
  startStudySession(`Topic practice: ${name}`);
  const questions = uniqueQuestions((window.SAT_EXTRACTED_QUESTIONS || []).filter(question => question.topic === name && !(name === "Algebra" && ["2937ef4f", "5a7ab8e8", "0393ba15", "cfe67646"].includes(question.id))).map(repairExtractedQuestion));
  const correctedAdvancedMathQuestion = {q:"(x + 5) + (2x − 3)\n\nWhich of the following is equivalent to the given expression?",o:["3x − 2","3x + 2","3x − 8","3x + 8"],a:1,e:"Combine like terms: x + 2x = 3x and 5 − 3 = 2, so the expression is 3x + 2. (Choice B.)",topic:"Advanced Math",difficulty:"Easy"};
  const practiceQuestions = name === "Advanced Math"
    ? [correctedAdvancedMathQuestion, ...questions.filter(item => questionKey(item) !== questionKey(correctedAdvancedMathQuestion))]
    : questions.length ? questions : uniqueQuestions(questionBank[name] || []);
  $("#topicModalContent").innerHTML = `<span class="topic-kicker">${subjectNames[t.subject].toUpperCase()} / FOCUS TOPIC</span><h2>${escapeHtml(t.name)}</h2><p class="modal-lead">${escapeHtml(t.desc)} Learn the strategy, then answer the questions below without leaving the app.</p>
  <div class="study-box"><h3>Study notes · What to remember</h3><ul>${t.tips.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>
  <div class="practice-toolbar"><div><span class="eyebrow">IN-APP PRACTICE SET</span><strong>${practiceQuestions.length} questions · instant explanations</strong></div><div class="level-pills"><button class="selected" data-level="all">All</button><button data-level="Easy">Easy</button><button data-level="Medium">Medium</button><button data-level="Hard">Hard</button></div></div>
  <div class="question-stack">${practiceQuestions.map((item, i) => { const level = String(item.difficulty || "Practice").trim().toLowerCase(); const usable = item.o.length === 4 && item.o.every(option => option.trim() && !/^[A-D]\.$/.test(option.trim())); const writtenResponse = ["integer", "number"].includes(item.responseType); const answerMarkup = writtenResponse ? `<label class="written-response"><span>Enter ${item.responseType === "integer" ? "an integer" : "a number or fraction"}:</span><input type="${item.responseType === "integer" ? "number" : "text"}" ${item.responseType === "integer" ? 'step="1" inputmode="numeric"' : 'inputmode="decimal"'} name="topic-${i}" aria-label="Enter your answer"></label><button class="check-question" data-question-index="${i}">Check this answer</button><div class="result-box"></div>` : usable ? `<div class="answer-options">${item.o.map((option, j) => `<label><input type="radio" name="topic-${i}" value="${j}"><span>${String.fromCharCode(65 + j)}. ${escapeHtml(option)}</span></label>`).join("")}</div><button class="check-question" data-question-index="${i}">Check this answer</button><div class="result-box"></div>` : `<div class="source-warning"><b>This question contains a formatted equation or answer choices that could not be read from the PDF text layer.</b><span>The question is kept in your collection, but it needs its original visual layout to display accurately.</span><a target="_blank" href="${fileUrl(window.SAT_MATERIALS.find(file => file.name === item.source)?.path || "")}">Open the original worksheet ↗</a></div>`; return `<div class="question-card question-${level}" data-level="${level}" data-answer="${item.answer || item.a}"><span class="question-difficulty">${escapeHtml(item.difficulty || "Practice")}</span>${item.graphMarkup || ""}<p><b>${i + 1}.</b> ${escapeHtml(item.q)}</p>${answerMarkup}<button class="secondary-button calculator-button" data-desmos>Open Desmos calculator</button></div>`; }).join("")}</div>
  <div class="score-result" id="answerResult"></div>
  <div class="study-box source-note"><h3>More practice from your collection</h3><p>These questions are now available here for a focused session. The original student worksheets and answer keys remain indexed in Resource Library.</p><button class="secondary-button" data-close>Back to topics</button></div>`;
  openModal("topicModal");
  $$(".check-question", $("#topicModal")).forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.questionIndex);
    const card = button.closest(".question-card");
    const selected = $(`input[name="topic-${index}"]:checked`, card);
    const result = $(".result-box", card);
    const item = practiceQuestions[index];
    result.style.display = "block";
    if (["integer", "number"].includes(item.responseType)) {
      const response = $(`input[name="topic-${index}"]`, card);
      const value = response.value.trim();
      if (!value || (item.responseType === "integer" ? !/^-?\d+$/.test(value) : !/^-?\d+(?:\/\d+)?(?:\.\d+)?$/.test(value))) { result.className = "result-box incorrect-result"; result.innerHTML = `<b>Enter ${item.responseType === "integer" ? "an integer" : "a number or fraction"} first.</b> Then check your work.`; return; }
      if (card.dataset.progressTracked !== "true") { card.dataset.progressTracked = "true"; recordProgress({questions:1}); }
      const normalize = input => { if (!input.includes("/")) return Number(input); const [numerator, denominator] = input.split("/").map(Number); return denominator ? numerator / denominator : NaN; };
      if (normalize(value) === normalize(String(item.answer))) { result.className = "result-box correct-result"; result.innerHTML = `<b>Correct — ${escapeHtml(value)}</b><p>${escapeHtml(item.e)}</p>`; button.textContent = "Answer checked"; }
      else { result.className = "result-box incorrect-result"; result.innerHTML = `<b>Not quite.</b><p>You entered <strong>${escapeHtml(value)}</strong>. The correct answer is <strong>${escapeHtml(item.answer)}</strong>.</p><p>${escapeHtml(item.e)}</p>`; button.textContent = "Try again"; }
      return;
    }
    if (!selected) { result.className = "result-box incorrect-result"; result.innerHTML = "<b>Choose an answer first.</b> Then check your work."; return; }
    if (card.dataset.progressTracked !== "true") { card.dataset.progressTracked = "true"; recordProgress({questions:1}); }
    const selectedIndex = Number(selected.value);
    const correctLabel = `${String.fromCharCode(65 + item.a)}. ${item.o[item.a]}`;
    const selectedLabel = `${String.fromCharCode(65 + selectedIndex)}. ${item.o[selectedIndex]}`;
    const choiceReview = item.o.map((option, optionIndex) => {
      const label = String.fromCharCode(65 + optionIndex);
      return `<li class="${optionIndex === item.a ? "choice-correct" : "choice-wrong"}"><b>${label}. ${escapeHtml(option)}</b><span>${escapeHtml(choiceExplanation(item, optionIndex))}</span></li>`;
    }).join("");
    if (selectedIndex === item.a) { result.className = "result-box correct-result"; result.innerHTML = `<b>Correct — ${escapeHtml(selectedLabel)}</b><details><summary>Why the other choices do not work</summary><ul class="choice-review">${choiceReview}</ul></details>`; button.textContent = "Answer checked"; }
    else { result.className = "result-box incorrect-result"; result.innerHTML = `<b>Not quite.</b><p>You chose <strong>${escapeHtml(selectedLabel)}</strong>. Correct answer: <strong>${escapeHtml(correctLabel)}</strong>.</p><details open><summary>Why each choice works or does not work</summary><ul class="choice-review">${choiceReview}</ul></details>`; button.textContent = "Try again"; }
  }));
  $$(".level-pills button").forEach(btn => btn.addEventListener("click", () => {
    const level = String(btn.dataset.level || "all").trim().toLowerCase();
    $$(".level-pills button").forEach(b => b.classList.toggle("selected", b === btn));
    $$(".question-card", $("#topicModal")).forEach(card => {
      card.classList.toggle("filtered-out", level !== "all" && card.dataset.level !== level);
    });
    const filteredCount = $$(".question-card", $("#topicModal")).filter(card => !card.classList.contains("filtered-out")).length;
    $(".practice-toolbar strong", $("#topicModal")).textContent = `${filteredCount} ${level === "all" ? "" : level + " "}questions · instant explanations`;
  }));
}
function navigate(view) {
  $$(".view").forEach(v => v.classList.remove("active-view")); $(`#${view}View`).classList.add("active-view");
  $$(".nav-link").forEach(n => n.classList.toggle("active", n.dataset.view === view));
  $("#breadcrumbCurrent").textContent = view === "dashboard" ? "Dashboard" : view === "learn" ? "Learn & practice" : view === "study" ? "Study guide" : view === "tests" ? "Practice tests" : "Resource library";
  if (location.hash !== `#${view}`) history.replaceState(null, "", `#${view}`);
  $(".sidebar").classList.remove("open");
}
function openModal(id) { const m = $(`#${id}`); m.classList.add("open"); m.setAttribute("aria-hidden","false"); }
function closeModals() { stopStudySession(); $$(".modal-backdrop").forEach(m => { m.classList.remove("open"); m.setAttribute("aria-hidden","true"); }); }
function openDesmos() { openModal("desmosModal"); }
function setupDesmosWindow() {
  const windowElement = $("#desmosWindow");
  const handle = $("#desmosDragHandle");
  const resizeHandle = $("#desmosResizeHandle");
  const backdrop = $("#desmosModal");
  if (!windowElement || !handle || !resizeHandle || !backdrop) return;
  let dragState = null;
  handle.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;
    const rect = windowElement.getBoundingClientRect();
    dragState = {pointerId: event.pointerId, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top};
    windowElement.classList.add("desmos-floating");
    windowElement.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", event => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    const maxX = Math.max(0, window.innerWidth - windowElement.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - windowElement.offsetHeight);
    windowElement.style.left = `${Math.min(maxX, Math.max(0, event.clientX - dragState.offsetX))}px`;
    windowElement.style.top = `${Math.min(maxY, Math.max(0, event.clientY - dragState.offsetY))}px`;
  });
  const stopDragging = () => { dragState = null; };
  handle.addEventListener("pointerup", stopDragging);
  handle.addEventListener("pointercancel", stopDragging);
  let resizeState = null;
  resizeHandle.addEventListener("pointerdown", event => {
    const rect = windowElement.getBoundingClientRect();
    resizeState = {pointerId: event.pointerId, startX: event.clientX, startWidth: rect.width};
    resizeHandle.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  resizeHandle.addEventListener("pointermove", event => {
    if (!resizeState || event.pointerId !== resizeState.pointerId) return;
    const width = Math.min(window.innerWidth - 24, Math.max(390, resizeState.startWidth - (event.clientX - resizeState.startX)));
    windowElement.style.width = `${width}px`;
  });
  const stopResizing = () => { resizeState = null; };
  resizeHandle.addEventListener("pointerup", stopResizing);
  resizeHandle.addEventListener("pointercancel", stopResizing);
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeModals();
  });
}
function renderPracticeTests() {
  const tests = [];
  const seenTests = new Set();
  window.SAT_MATERIALS.filter(f => f.kind === "practice" && !/(answer|scoring|explanation)/i.test(`${f.name} ${f.path}`)).forEach(file => {
    const match = `${file.name} ${file.path}`.match(/(?:practice\s*test|test)[^0-9]*(\d+)/i);
    const key = match ? `test-${match[1]}` : file.path.toLowerCase();
    if (!seenTests.has(key)) {
      seenTests.add(key);
      tests.push(file);
    }
  });
  tests.sort((left, right) => {
    const number = file => Number((`${file.name} ${file.path}`.match(/(?:practice\s*test|test)[^0-9]*(\d+)/i) || [0, 0])[1]);
    return number(left) - number(right);
  });
  $("#practiceTakenSummary").textContent = `0 of ${tests.length} taken`;
  $("#takenPracticeCount").textContent = "0";
  const savedPracticeScore = JSON.parse(localStorage.getItem("sat-scores") || '{"current":0}').current;
  $("#projectedPracticeScore").textContent = savedPracticeScore || "—";
  $("#practiceList").innerHTML = tests.map((f, i) => `<div class="practice-row" data-practice-status="not-started"><span class="practice-number">${i + 1}</span><div><strong>Practice Test ${i + 1}</strong><small>98 questions · 2h 14m</small></div><div class="practice-actions"><button data-test-paper="${i}" data-test-mode="full">Full test <span>→</span></button><button class="section-test" data-test-paper="${i}" data-test-mode="reading">Reading & Writing</button><button class="section-test" data-test-paper="${i}" data-test-mode="math">Math</button></div></div>`).join("");
  $$("#practiceList button").forEach(b => b.addEventListener("click", () => startTest(Number(b.dataset.testPaper) + 1, b.dataset.testMode)));
  $$(".practice-tab").forEach(tab => tab.addEventListener("click", () => {
    $$(".practice-tab").forEach(item => item.classList.toggle("selected", item === tab));
    const filter = tab.dataset.practiceFilter;
    $$(".practice-row").forEach(row => { row.hidden = filter !== "all" && row.dataset.practiceStatus !== filter; });
  }));
}
function renderLibrary() {
  const term = ($("#librarySearch")?.value || "").toLowerCase(); const filter = $("#libraryFilter")?.value || "all"; const subject = $("#librarySubject")?.value || "all";
  const normalizedSubject = f => f.category.includes("Math") || f.category.includes("Algebra") || f.category.includes("Geometry") || f.category.includes("Problem Solving") || f.category.includes("Advanced") ? "math" : f.category.includes("Reading") || f.category.includes("Craft") || f.category.includes("Information") ? "reading" : f.category.includes("Writing") || f.category.includes("Expression") || f.category.includes("Standard") ? "writing" : "resources";
  const typeLabel = {worksheet:"Student worksheet",answer:"Answer key",guide:"Guide / reference",practice:"Practice paper"};
  const results = window.SAT_MATERIALS.filter(f => (!term || f.name.toLowerCase().includes(term) || f.category.toLowerCase().includes(term)) && (filter === "all" || f.kind === filter) && (subject === "all" || normalizedSubject(f) === subject)).slice(0, 160);
  $("#libraryCount").textContent = window.SAT_MATERIALS.length;
  const groups = ["math","reading","writing","resources"];
  $("#libraryList").innerHTML = results.length ? groups.map(group => {
    const groupFiles = results.filter(f => normalizedSubject(f) === group);
    if (!groupFiles.length) return "";
    return `<div class="library-group"><div class="library-group-heading"><div><span class="eyebrow">${group === "resources" ? "GENERAL RESOURCES" : subjectNames[group].toUpperCase()}</span><h2>${group === "resources" ? "Guides & reference" : subjectNames[group] + " materials"}</h2></div><span>${groupFiles.length} files</span></div><div class="library-group-items">${groupFiles.map(f => `<div class="library-item"><span class="file-icon">${f.ext === "pptx" ? "PPT" : f.ext === "docx" ? "DOC" : "PDF"}</span><div><strong title="${escapeHtml(f.name)}">${escapeHtml(f.name)}</strong><small>${escapeHtml(f.category)} · ${typeLabel[f.kind] || f.kind}</small></div><a target="_blank" href="${fileUrl(f.path)}">Open ↗</a></div>`).join("")}</div></div>`;
  }).join("") : `<p class="modal-lead">No materials match that search.</p>`;
}
function startTest(testNumber = 1, mode = "full") {
  startStudySession(`${mode} practice test`);
  const allModules = [
    {name:"Reading & Writing · Module 1",subject:"reading",count:27,seconds:32 * 60},
    {name:"Reading & Writing · Module 2",subject:"reading",count:27,seconds:32 * 60},
    {name:"Math · Module 1",subject:"math",count:22,seconds:35 * 60},
    {name:"Math · Module 2",subject:"math",count:22,seconds:35 * 60}
  ];
  const modules = mode === "reading" ? allModules.slice(0, 2) : mode === "math" ? allModules.slice(2) : allModules;
  const sectionLabel = mode === "reading" ? "Reading & Writing" : mode === "math" ? "Math" : "Full Digital SAT";
  const cleanChoice = value => String(value)
    .replace(/(?:\s*\.\s*){3,}/g, " ")
    .replace(/[.…]{4,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const paperQuestions = (window.SAT_PRACTICE_TESTS || [])
    .filter(item => item.test === testNumber)
    .map(item => ({...item, o: Array.isArray(item.o) ? item.o.map(cleanChoice) : item.o}));
  const usable = item => Array.isArray(item.o) && item.o.length === 4 && item.o.every(option => option && !/^[A-D]\.$/.test(String(option).trim())) && item.a !== null && item.a !== undefined;
  const readingQuestions = uniqueQuestions(paperQuestions.filter(item => item.subject === "reading" && usable(item)));
  const mathQuestions = uniqueQuestions(paperQuestions.filter(item => item.subject === "math" && usable(item)));
  const all = uniqueQuestions((window.SAT_EXTRACTED_QUESTIONS || [])
    .filter(item => item.id !== "49efde89")
    .map(repairExtractedQuestion));
  const pool = subject => uniqueQuestions((subject === "reading-writing" ? readingQuestions : mathQuestions).concat(
    paperQuestions.length ? [] : all.filter(item => (subject === "reading-writing" ? ["reading", "writing"].includes(item.subject) : item.subject === subject) && usable(item)).concat(
    subject === "math" ? questionBank["Algebra"].concat(questionBank["Advanced Math"], questionBank["Problem Solving and Data Analysis"], questionBank["Geometry and Trigonometry"]).filter(usable) : questionBank["Craft and Structure"].concat(questionBank["Information and Ideas"], questionBank["Expression of Ideas"], questionBank["Standard English Conventions"]).filter(usable)
  )));
  const fallbackQuestions = {
    "reading-writing": questionBank["Craft and Structure"].concat(questionBank["Information and Ideas"], questionBank["Expression of Ideas"], questionBank["Standard English Conventions"]),
    math: questionBank["Algebra"].concat(questionBank["Advanced Math"], questionBank["Problem Solving and Data Analysis"], questionBank["Geometry and Trigonometry"])
  };
  const take = (items, count, subject) => {
    const source = items.slice();
    const seen = new Set(source.map(questionKey));
    fallbackQuestions[subject].filter(usable).forEach(item => {
      if (source.length < count && !seen.has(questionKey(item))) {
        seen.add(questionKey(item));
        source.push(item);
      }
    });
    return source.slice(0, count);
  };
  const testQuestions = [take(pool("reading-writing"), 54, "reading-writing"), take(pool("math"), 44, "math")];
  let module = 0, question = 0, secondsLeft = modules[0].seconds, countdown;
  const answers = Array.from({length: mode === "reading" ? 54 : mode === "math" ? 44 : 98}, () => null);
  const globalIndex = () => mode === "math" ? question + (module * 22) : mode === "reading" ? question + (module * 27) : (module < 2 ? module * 27 : 54 + (module - 2) * 22) + question;
  const formatTime = value => `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
  const score = () => {
    const readingAnswers = mode === "math" ? [] : mode === "reading" ? answers : answers.slice(0, 54);
    const mathAnswers = mode === "math" ? answers : mode === "reading" ? [] : answers.slice(54);
    const readingCorrect = readingAnswers.filter((answer, index) => answer === testQuestions[0][index].a).length;
    const mathCorrect = mathAnswers.filter((answer, index) => answer === testQuestions[1][index].a).length;
    const sectionScore = correct => Math.round(200 + (correct / 54) * 600);
    const mathScore = correct => Math.round(200 + (correct / 44) * 600);
    return {readingCorrect, mathCorrect, readingScore:sectionScore(readingCorrect), mathScore:mathScore(mathCorrect)};
  };
  const finish = () => {
    clearInterval(countdown);
    stopStudySession();
    const result = score();
    const isReading = mode === "reading", isMath = mode === "math";
    const scoreTitle = isReading ? `${result.readingScore}/800` : isMath ? `${result.mathScore}/800` : `${result.readingScore + result.mathScore}/1600`;
    const scoreDetails = isReading ? `<p>Reading & Writing: ${result.readingCorrect}/54 correct → ${result.readingScore}/800</p>` : isMath ? `<p>Math: ${result.mathCorrect}/44 correct → ${result.mathScore}/800</p>` : `<p>Reading & Writing: ${result.readingCorrect}/54 correct → ${result.readingScore}/800</p><p>Math: ${result.mathCorrect}/44 correct → ${result.mathScore}/800</p><p>Total: ${result.readingScore} + ${result.mathScore} = ${result.readingScore + result.mathScore}/1600</p>`;
    $("#testModalContent").innerHTML = `<span class="eyebrow">TEST COMPLETE</span><h2>That’s a wrap.</h2><p class="modal-lead">You completed the ${sectionLabel} practice session.</p><div class="results-summary"><span class="eyebrow">SCORE CALCULATION</span><strong>${scoreTitle}</strong>${scoreDetails}</div><button class="primary-button" data-close style="margin-top:18px">Back to practice tests</button>`;
  };
  const showBreak = () => {
    clearInterval(countdown);
    $("#testModalContent").innerHTML = `<span class="eyebrow">BREAK</span><h2>Take ten.</h2><p class="modal-lead">Your official 10-minute break is not included in the 134 testing minutes.</p><div class="timer-display" id="breakCountdown">10:00</div><button class="primary-button" id="resumeTest">Start Math Section <span>→</span></button>`;
    let breakSeconds = 600;
    const breakTimer = setInterval(() => { breakSeconds--; const display = $("#breakCountdown"); if (display) display.textContent = formatTime(breakSeconds); if (breakSeconds <= 0) { clearInterval(breakTimer); $("#resumeTest").click(); } }, 1000);
    $("#resumeTest").addEventListener("click", () => { clearInterval(breakTimer); module = 2; question = 0; secondsLeft = modules[2].seconds; render(); });
  };
  const next = () => { if (question < modules[module].count - 1) { question++; render(); } else if (mode === "full" && module === 1) showBreak(); else if (module === modules.length - 1) finish(); else { module++; question = 0; secondsLeft = modules[module].seconds; render(); } };
  const render = () => {
    clearInterval(countdown);
    const current = modules[module], mathModule = current.subject === "math", list = mathModule ? testQuestions[1] : testQuestions[0], offset = mathModule ? (mode === "math" ? module * 22 : (module - 2) * 22) : module * 27, currentQuestion = list[offset + question];
    if (!currentQuestion) {
      clearInterval(countdown);
      $("#testModalContent").innerHTML = `<span class="eyebrow">PRACTICE TEST</span><h2>Questions are unavailable.</h2><p class="modal-lead">The question files could not be loaded. Refresh the page and try again.</p><button class="primary-button" data-close>Close</button>`;
      openModal("testModal");
      return;
    }
    const selected = answers[globalIndex()];
    const finalModule = module === modules.length - 1;
    const finalButton = question === current.count - 1 ? (finalModule ? "Finish test" : mode === "full" && module === 1 ? "Take 10 min break" : "Continue") : "Next question";
    $("#testModalContent").innerHTML = `<span class="eyebrow">MODULE ${module + 1} OF ${modules.length} · QUESTION ${question + 1} OF ${current.count}</span><h2>${current.name}</h2><p class="modal-lead">${current.count} questions · ${formatTime(current.seconds)} total · approximately ${current.subject === "reading" ? "1:11" : "1:35"} per question</p><div class="test-progress"><i style="width:${((question + 1) / current.count) * 100}%"></i></div><div class="test-question"><span class="eyebrow">PRACTICE TEST QUESTION ${globalIndex() + 1}</span><p>${escapeHtml(currentQuestion.q)}</p><div class="answer-grid">${currentQuestion.o.map((option, index) => `<button class="${selected === index ? "selected" : ""}" data-answer="${index}">${String.fromCharCode(65 + index)}. ${escapeHtml(option)}</button>`).join("")}</div><button class="secondary-button calculator-button" data-desmos>Open Desmos calculator</button></div><div class="test-footer"><span class="modal-lead">Time remaining: <b id="testCountdown">${formatTime(secondsLeft)}</b></span><button class="primary-button" id="nextModule">${finalButton} <span>→</span></button></div>`;
    openModal("testModal");
    $$(".answer-grid button").forEach(button => button.addEventListener("click", () => {
      const answerIndex = globalIndex();
      if (answers[answerIndex] === null) recordProgress({questions:1});
      answers[answerIndex] = Number(button.dataset.answer);
      $$(".answer-grid button").forEach(item => item.classList.remove("selected"));
      button.classList.add("selected");
    }));
    $("#nextModule").addEventListener("click", next);
    countdown = setInterval(() => {
      secondsLeft = Math.max(0, secondsLeft - 1);
      const display = $("#testCountdown");
      if (display) display.textContent = formatTime(secondsLeft);
      if (secondsLeft === 0) {
        clearInterval(countdown);
        next();
      }
    }, 1000);
  };
  render();
}
let timerSeconds = 1500, timerInterval;
function updateTimer() { $("#timerDisplay").textContent = `${String(Math.floor(timerSeconds/60)).padStart(2,"0")}:${String(timerSeconds%60).padStart(2,"0")}`; }
let scoreState = JSON.parse(localStorage.getItem("sat-scores") || '{"current":1240,"goal":1400}');
function updateScores() {
  const current = Number(scoreState.current), goal = Number(scoreState.goal);
  $("#currentScoreValue").textContent = current;
  $("#scoreGap").textContent = `Goal: ${goal}`;
  $("#scoreSummary").textContent = current >= goal ? "Goal reached — keep building!" : `${goal - current} points to your goal`;
  $("#scoreProgress").style.width = `${Math.min(100, Math.max(0, ((current - 400) / (goal - 400)) * 100))}%`;
  if ($("#testScoreValue")) $("#testScoreValue").textContent = current;
  if ($("#testGoalValue")) $("#testGoalValue").textContent = `Goal: ${goal}`;
}
$("#todayLabel").textContent = new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(new Date());
renderTopics(); renderLessons(); renderPracticeTests(); renderLibrary(); updateTimer(); updateProgressDashboard();
updateScores();
$$(".nav-link").forEach(n => n.addEventListener("click", e => { e.preventDefault(); navigate(n.dataset.view); }));
$$("[data-go]").forEach(b => b.addEventListener("click", () => navigate(b.dataset.go)));
document.addEventListener("click", event => {
  if (event.target.closest("[data-desmos]")) {
    event.preventDefault();
    openDesmos();
    return;
  }
  const subjectButton = event.target.closest(".subject-tab");
  if (!subjectButton) return;
  event.preventDefault();
  navigate("learn");
  $$(".subject-tab").forEach(button => button.classList.toggle("selected", button === subjectButton));
  renderTopics(subjectButton.dataset.subject || "all");
});
$$("[data-close]").forEach(b => b.addEventListener("click", closeModals)); $$(".modal-backdrop").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModals(); }));
document.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModals(); });
$("#mobileMenu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
$("#themeToggle").addEventListener("click", () => { document.body.classList.toggle("dark"); const dark = document.body.classList.contains("dark"); $("#themeLabel").textContent = dark ? "Light mode" : "Night mode"; $("#themeIcon").textContent = dark ? "☀" : "☾"; localStorage.setItem("sat-theme", dark ? "dark" : "light"); });
if (localStorage.getItem("sat-theme") === "dark") $("#themeToggle").click();
$("#openTimer").addEventListener("click", () => openModal("timerModal"));
$("#timerStart").addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval); timerInterval = null; stopStudySession(); $("#timerStart").textContent = "Start timer";
  } else {
    startStudySession("Focus timer");
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) timerSeconds--;
      else { clearInterval(timerInterval); timerInterval = null; stopStudySession(); }
      updateTimer();
    }, 1000);
    $("#timerStart").textContent = "Pause timer";
  }
});
$("#timerReset").addEventListener("click", () => { clearInterval(timerInterval); timerInterval = null; stopStudySession(); timerSeconds = 1500; updateTimer(); $("#timerStart").textContent = "Start timer"; });
$("#editScore").addEventListener("click", () => { $("#currentScoreInput").value = scoreState.current; $("#goalScoreInput").value = scoreState.goal; $("#scoreError").textContent = ""; openModal("scoreModal"); });
$("#saveScores").addEventListener("click", () => {
  const current = Number($("#currentScoreInput").value), goal = Number($("#goalScoreInput").value), error = $("#scoreError");
  if (!Number.isInteger(current) || !Number.isInteger(goal) || current < 400 || current > 1600 || goal < 400 || goal > 1600 || current % 10 || goal % 10) { error.textContent = "Enter whole SAT scores from 400 to 1600 in 10-point increments."; return; }
  if (goal < current) { error.textContent = "Your goal should be at least your current score."; return; }
  scoreState = {current, goal}; localStorage.setItem("sat-scores", JSON.stringify(scoreState)); updateScores(); closeModals();
});
$("#editGoals").addEventListener("click", () => {
  $("#studyGoalInput").value = progressState.goals.studyMinutes;
  $("#questionGoalInput").value = progressState.goals.questions;
  $("#goalsError").textContent = "";
  openModal("goalsModal");
});
$("#saveGoals").addEventListener("click", () => {
  const studyMinutes = Number($("#studyGoalInput").value);
  const questions = Number($("#questionGoalInput").value);
  const error = $("#goalsError");
  if (!Number.isInteger(studyMinutes) || studyMinutes < 1 || studyMinutes > 10080 || !Number.isInteger(questions) || questions < 1 || questions > 10000) {
    error.textContent = "Enter positive whole-number goals within the listed limits.";
    return;
  }
  progressState.goals = {studyMinutes, questions};
  saveProgress();
  updateProgressDashboard();
  closeModals();
});
$("#startTest").addEventListener("click", startTest); $("#librarySearch").addEventListener("input", renderLibrary); $("#libraryFilter").addEventListener("change", renderLibrary); $("#librarySubject").addEventListener("change", renderLibrary);
setupDesmosWindow();
$$(".lesson-filter").forEach(b => b.addEventListener("click", () => { $$(".lesson-filter").forEach(x => x.classList.remove("selected")); b.classList.add("selected"); renderLessons(b.dataset.lessonFilter); }));
$$("[data-open-topic]").forEach(b => b.addEventListener("click", () => { navigate("learn"); setTimeout(() => openTopic(b.dataset.openTopic), 0); }));
const initial = location.hash.replace("#",""); if (["learn","study","tests","library"].includes(initial)) navigate(initial);
