/** User Secret Infos */
export class Secret {
    /** target host */
    host: string;
    /** minecraft username or email */
    username: string;
    /** minecraft password */
    password: string;
    /** server port */
    port: number;
    /** auth server */
    auth: 'mojang' | 'microsoft';
}
