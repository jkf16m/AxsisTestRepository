import { createAuthProvider } from "react-token-auth";

export type Session = { accessToken : string, refreshToken: string};

export const { useAuth, authFetch, login, logout, getSessionState, getSession } = createAuthProvider<Session>({
    getAccessToken: session => session.accessToken,
    storage: localStorage,
    onUpdateToken: (token) => fetch("http://localhost:3000/api/session", {
        method: "PUT",
        body: token.refreshToken
    }).then(r=>r.json()),
});