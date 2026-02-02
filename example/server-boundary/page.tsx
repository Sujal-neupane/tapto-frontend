import { exampleAction } from "@/lib/actions/example-action";

export default async function Page() {
    const result = await exampleAction();
    return (
        <div> Page is ready</div>
    )
}