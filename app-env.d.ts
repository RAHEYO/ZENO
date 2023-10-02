declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_LOCAL_HOST: string;
            NEXT_PUBLIC_LOCAL_USER: string;
            NEXT_PUBLIC_LOCAL_DATABASE: string;
            NEXT_PUBLIC_LOCAL_SERVER_PASS: string;
        }
    }
}
