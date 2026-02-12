// database.js - База данных упражнений для RehabPro

// База данных упражнений
const exercisesDatabase = [
    {
        id: 1,
        name: "Разминка спины",
        injuryType: "back",
        difficulty: "beginner",
        description: "Короткий комплекс для мягкого растягивания и расслабления мышц спины. ",
        duration: "3 подхода по 10–15 повторений",
        videoUrl: "1",
        warning: "Избегайте резких движений при грыжах и острой боли",
        tips: "Двигайтесь плавно, синхронизируя движение с дыханием. Автор: https://rutube.ru/u/lfk/",
        muscleGroup: "Разгибатели спины, мышцы кора",
        equipment: "Гимнастическая палка"
    },
    {
        id: 2,
        name: "Маятниковые махи руками",
        injuryType: "shoulder",
        difficulty: "beginner",
        description: "Мягкая разработка плечевого сустава без нагрузки.",
        duration: "2–3 подхода по 20 секунд",
        videoUrl: "5",
        warning: "Избегайте боли при воспалении плеча",
        tips: "Расслабьте плечи и выполняйте свободные движения. Автор: https://rutube.ru/u/lfk/",
        muscleGroup: "Дельтовидные мышцы",
        equipment: "Без оборудования"
    },
    {
        id: 3,
        name: "Изометрическое сопротивление для шеи",
        injuryType: "neck",
        difficulty: "intermediate",
        description: "Укрепление мышц шеи без активного движения.",
        duration: "3 подхода по 10 секунд в каждую сторону",
        videoUrl: "8",
        warning: "Не давите слишком сильно рукой",
        tips: "Сохраняйте ровную осанку. Автор: https://rutube.ru/u/lfk/",
        muscleGroup: "Глубокие мышцы шеи",
        equipment: "Без оборудования"
    },
    {
        id: 4,
        name: "Подъем ноги лежа",
        injuryType: "knee",
        difficulty: "beginner",
        description: "Укрепление четырехглавой мышцы бедра без нагрузки на коленный сустав.",
        duration: "3 подхода по 15 повторений",
        videoUrl: "6",
        warning: "Не выполняйте при острой боли в колене",
        tips: "Держите колено прямым на протяжении всего упражнения",
        muscleGroup: "Квадрицепс",
        equipment: "Коврик"
    },
    {
        id: 5,
        name: "Наклоны головы вперед-назад",
        injuryType: "neck",
        difficulty: "beginner",
        description: "Легкое упражнение для снятия напряжения и улучшения подвижности шейного отдела.",
        duration: "2 подхода по 10 повторений",
        videoUrl: "2",
        warning: "Не запрокидывайте голову резко назад",
        tips: "Выполняйте движения медленно и без боли.  Автор: https://www.youtube.com/@GymBalance",
        muscleGroup: "Грудинно-ключично-сосцевидная мышца",
        equipment: "Без оборудования"
    },
    {
        id: 6,
        name: "Круговые движения стопой",
        injuryType: "ankle",
        difficulty: "beginner",
        description: "Разработка голеностопного сустава после травм и при малоподвижности.",
        duration: "2 подхода по 15 вращений",
        videoUrl: "4",
        warning: "Не выполняйте при свежем растяжении",
        tips: "Двигайтесь медленно, контролируя амплитуду.  Автор: https://www.youtube.com/@eastclinica/shorts",
        muscleGroup: "Мышцы голени",
        equipment: "Стул"
    },
    {
        id: 7,
        name: "Ягодичный мостик",
        injuryType: "back",
        difficulty: "intermediate",
        description: "Укрепляет поясницу и ягодицы, стабилизирует позвоночник.",
        duration: "3 подхода по 15 повторений",
        videoUrl: "7",
        warning: "Избегайте переразгибания поясницы",
        tips: "Поднимайте таз до линии корпуса. Автор: https://www.youtube.com/@Katya_perrott/shorts",
        muscleGroup: "Ягодичные, разгибатели спины",
        equipment: "Коврик"
    },
    {
        id: 8,
        name: "Круговые вращения кистями в замке",
        injuryType: "wrist",
        difficulty: "beginner",
        description: "Улучшает кровообращение и подвижность лучезапястного сустава.",
        duration: "2 подхода по 15 вращений в каждую сторону",
        videoUrl: "3",
        warning: "Не выполняйте через боль при воспалении",
        tips: "Держите предплечья неподвижными.   Автор: https://www.youtube.com/@GymBalance",
        muscleGroup: "Сгибатели и разгибатели кисти",
        equipment: "Без оборудования"
    },
    {
        id: 9,
        name: "Сгибание кисти с эспандером",
        injuryType: "wrist",
        difficulty: "intermediate",
        description: "Укрепление мышц предплечья с легким сопротивлением.",
        duration: "3 подхода по 12 повторений",
        videoUrl: "9",
        warning: "Не увеличивайте нагрузку резко",
        tips: "Контролируйте движение в обе стороны. Автор: https://www.youtube.com/@Stepan-Kochkin/shorts",
        muscleGroup: "Сгибатели кисти",
        equipment: "Эспандер"
    },
    {
        id: 10,
        name: "Баланс на одной ноге",
        injuryType: "ankle",
        difficulty: "intermediate",
        description: "Развитие стабильности голеностопа и координации.",
        duration: "3 подхода по 30 секунд",
        videoUrl: "10",
        warning: "Держитесь за опору при необходимости",
        tips: "Смотрите в одну точку для лучшего баланса. Автор: https://www.youtube.com/@prokoleno1/shorts",
        muscleGroup: "Мышцы стабилизаторы голени",
        equipment: "Без оборудования"
    },
    {
        id: 11,
        name: "Вращения плеч с резинкой",
        injuryType: "shoulder",
        difficulty: "intermediate",
        description: "Укрепление ротаторной манжеты плеча.",
        duration: "3 подхода по 12 повторений",
        videoUrl: "11",
        warning: "Не поднимайте плечи вверх во время движения",
        tips: "Локти держите прижатыми к корпусу. Автор: https://www.youtube.com/watch?v=zhDECKKKXu4",
        muscleGroup: "Ротаторная манжета",
        equipment: "Фитнес-резинка"
    },
    {
        id: 12,
        name: "Полуприсед",
        injuryType: "knee",
        difficulty: "intermediate",
        description: "Укрепление мышц бедра и стабилизация коленного сустава.",
        duration: "3 подхода по 12 повторений",
        videoUrl: "12",
        warning: "Колени не должны выходить далеко за носки",
        tips: "Держите спину прямой. Автор: https://www.youtube.com/@viaction5075",
        muscleGroup: "Квадрицепс, ягодичные",
        equipment: "Без оборудования"
    },
    {
        id: 13,
        name: "Планка",
        injuryType: "back",
        difficulty: "advanced",
        description: "Укрепление мышц кора и стабилизаторов позвоночника.",
        duration: "3 подхода по 60 секунд",
        videoUrl: "13",
        warning: "Не прогибайте поясницу",
        tips: "Держите тело в прямой линии. Автор: https://www.youtube.com/@arseniy_kim",
        muscleGroup: "Мышцы кора",
        equipment: "Коврик"
    },
    {
        id: 14,
        name: "Динамическое укрепление шеи с резинкой",
        injuryType: "neck",
        difficulty: "advanced",
        description: "Продвинутая стабилизация шейного отдела.",
        duration: "3 подхода по 12 повторений",
        videoUrl: "14",
        warning: "Не выполняйте при нестабильности позвонков",
        tips: "Контролируйте движение без рывков. Автор: https://www.youtube.com/@grigoriy_lfk",
        muscleGroup: "Глубокие сгибатели шеи",
        equipment: "Эластичная лента"
    },
    {
        id: 15,
        name: "Отжимания на кулаках",
        injuryType: "wrist",
        difficulty: "advanced",
        description: "Укрепление кистей и предплечий с нагрузкой.",
        duration: "3 подхода по 10 повторений",
        videoUrl: "15",
        warning: "Не выполнять при воспалении суставов кисти",
        tips: "Держите запястья в нейтральном положении. Автор: https://www.youtube.com/@lanmakoev.smartkarate2699/shorts",
        muscleGroup: "Разгибатели кисти",
        equipment: "Коврик"
    },
    {
        id: 16,
        name: "Подъемы на носки стоя",
        injuryType: "ankle",
        difficulty: "advanced",
        description: "Укрепление икроножных мышц и голеностопа.",
        duration: "3 подхода по 20 повторений",
        videoUrl: "16",
        warning: "Держитесь за опору при нарушении баланса",
        tips: "Поднимайтесь медленно и опускайтесь контролируемо. Автор: https://www.youtube.com/@SergeySivets",
        muscleGroup: "Икроножные мышцы",
        equipment: "Без оборудования"
    },
    {
        id: 17,
        name: "Жим резинки над головой",
        injuryType: "shoulder",
        difficulty: "advanced",
        description: "Укрепление плечевого пояса и стабилизаторов.",
        duration: "3 подхода по 12 повторений",
        videoUrl: "17",
        warning: "Избегайте боли при подъеме рук",
        tips: "Контролируйте положение лопаток. Автор: https://www.youtube.com/@%D0%92%D0%B8%D0%B4%D0%B5%D0%BE%D1%83%D1%80%D0%BE%D0%BA%D0%B8-%D1%842%D1%80",
        muscleGroup: "Дельтовидные мышцы",
        equipment: "Фитнес-резинка"
    },
    {
        id: 18,
        name: "Выпады вперед",
        injuryType: "knee",
        difficulty: "advanced",
        description: "Функциональное укрепление коленного сустава и бедра.",
        duration: "3 подхода по 12 повторений на каждую ногу",
        videoUrl: "18",
        warning: "Колено не должно заваливаться внутрь",
        tips: "Сохраняйте равновесие и прямую спину. Автор: https://www.youtube.com/@prokoleno1/shorts",
        muscleGroup: "Квадрицепс, ягодичные",
        equipment: "Без оборудования"
    }
];

// Вспомогательные функции для работы с упражнениями
function getExercisesByInjuryType(injuryType) {
    return exercisesDatabase.filter(exercise => exercise.injuryType === injuryType);
}

function getExercisesByDifficulty(difficulty) {
    return exercisesDatabase.filter(exercise => exercise.difficulty === difficulty);
}

function searchExercises(keyword) {
    const searchTerm = keyword.toLowerCase();
    return exercisesDatabase.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm) ||
        exercise.description.toLowerCase().includes(searchTerm) ||
        exercise.muscleGroup.toLowerCase().includes(searchTerm)
    );
}

function getExerciseById(id) {
    return exercisesDatabase.find(exercise => exercise.id === id);
}

function getAllInjuryTypes() {
    const types = new Set();
    exercisesDatabase.forEach(exercise => {
        types.add(exercise.injuryType);
    });
    return Array.from(types);
}

function getAllDifficultyLevels() {
    const levels = new Set();
    exercisesDatabase.forEach(exercise => {
        levels.add(exercise.difficulty);
    });
    return Array.from(levels);
}

// Функция для добавления нового упражнения (для административного использования)
function addExercise(newExercise) {
    // Генерируем новый ID
    const maxId = Math.max(...exercisesDatabase.map(ex => ex.id));
    newExercise.id = maxId + 1;
    
    exercisesDatabase.push(newExercise);
    return newExercise;
}

// Функция для обновления упражнения
function updateExercise(id, updatedData) {
    const index = exercisesDatabase.findIndex(exercise => exercise.id === id);
    if (index !== -1) {
        exercisesDatabase[index] = { ...exercisesDatabase[index], ...updatedData };
        return exercisesDatabase[index];
    }
    return null;
}

// Функция для удаления упражнения
function deleteExercise(id) {
    const index = exercisesDatabase.findIndex(exercise => exercise.id === id);
    if (index !== -1) {
        return exercisesDatabase.splice(index, 1)[0];
    }
    return null;
}

// Делаем переменную и функции доступными глобально
window.exercisesDatabase = exercisesDatabase;
window.getExercisesByInjuryType = getExercisesByInjuryType;
window.getExercisesByDifficulty = getExercisesByDifficulty;
window.searchExercises = searchExercises;
window.getExerciseById = getExerciseById;
window.getAllInjuryTypes = getAllInjuryTypes;
window.getAllDifficultyLevels = getAllDifficultyLevels;
window.addExercise = addExercise;
window.updateExercise = updateExercise;
window.deleteExercise = deleteExercise;

// Сообщение в консоль для отладки
console.log('База данных упражнений загружена. Доступно упражнений:', exercisesDatabase.length);

// Экспорт для Node.js (если потребуется)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        exercisesDatabase,
        getExercisesByInjuryType,
        getExercisesByDifficulty,
        searchExercises,
        getExerciseById,
        getAllInjuryTypes,
        getAllDifficultyLevels,
        addExercise,
        updateExercise,
        deleteExercise
    };
}