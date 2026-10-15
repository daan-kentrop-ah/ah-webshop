"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {AlertCircleIcon} from "lucide-react";
import PageHeader from "@/components/page-header";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {apiFetch} from "@/lib/api-fetch";

async function login(credentials: { username: string; password: string }) {
    await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
}

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            setPassword('');
            router.replace('/');
            router.refresh();
        },
    });

    return (
        <main className="mx-auto max-w-md">
            <PageHeader title="Inloggen"/>
            {mutation.isError && (
                <Alert variant="destructive" className={"mt-4"}>
                    <AlertCircleIcon/>
                    <AlertTitle>Inloggen mislukt</AlertTitle>
                    <AlertDescription>{mutation.error.message}</AlertDescription>
                </Alert>
            )}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!mutation.isPending) mutation.mutate({ username, password });
                }}
            >
                <div className="my-4">
                    <Label htmlFor="username" className={"py-2"}>Gebruikersnaam</Label>
                    <Input
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        disabled={mutation.isPending}
                        required
                    />
                </div>
                <div className="my-4">
                    <Label htmlFor="password" className={"py-2"}>Wachtwoord</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={mutation.isPending}
                        required
                    />
                </div>
                <Button className={"bg-sky-500 hover:bg-sky-600 w-full"} type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Bezig met inloggen…' : 'Inloggen'}
                </Button>
            </form>
        </main>
    );
}
