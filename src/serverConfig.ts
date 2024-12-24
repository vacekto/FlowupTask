const JWT_SECRET = await crypto.subtle.generateKey(
    { name: 'HMAC', hash: 'SHA-512' },
    true,
    ['sign', 'verify'],
);

const config = {
    ENV: Deno.env.get('ENV')!,
    MONGO_URI: Deno.env.get('MONGO_URI')!,
    SERVER_PORT: Number(Deno.env.get('SERVER_PORT')) || 3000,
    MONGO_DB_NAME: 'flowup_task',
    JWT_SECRET,
};

type TConfig = keyof typeof config;

const requiredData: TConfig[] = ['ENV', 'MONGO_URI'];

const checkForRequiredENV = () => {
    const missingENV = requiredData.filter((e) => !config[e]);
    if (missingENV.length > 0) {
        throw new Error('following ENV variables are missing: ' + missingENV);
    }
};

checkForRequiredENV();

export default config;
