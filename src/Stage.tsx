import {ReactElement} from "react";
import {StageBase, StageResponse, InitialData, Message} from "@chub-ai/stages-ts";
import {LoadResponse} from "@chub-ai/stages-ts/dist/types/load";


type MessageStateType = any;

type ConfigType = any;

type InitStateType = any;

type ChatStateType = any;

export class Stage extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {

    fetishes: string[] = [];
    mechanism: string = '';
    flavor: string = '';

    config: ConfigType = {};

    constructor(data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) {
        super(data);
        const {
            characters,
            users,
            config,
            messageState,
            environment,
            initState,
            chatState
        } = data;


        this.config = config;

        this.readMessageState(messageState);
    }

    async load(): Promise<Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>> {
        // Compare config settings to current state; if there are conflicts, reset message state.
        


        return {
            success: true,
            error: null,
            initState: null,
            chatState: null,
            messageState: this.writeMessageState()
        };
    }

    async setState(state: MessageStateType): Promise<void> {
        if (state != null) {
            this.readMessageState(state);
        }
    }

    readMessageState(messageState: MessageStateType) {
        this.fetishes = messageState['fetishes'] ?? [];
        this.mechanism = messageState['mechanism'] ?? '';
        this.flavor = messageState['flavor'] ?? '';
    }

    writeMessageState() {
        return {
            'fetishes': this.fetishes,
            'mechanism': this.mechanism,
            'flavor': this.flavor
        }
    }

    async beforePrompt(userMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
        const {
            content,
            anonymizedId,
            isBot
        } = userMessage;




        return {
            stageDirections: null,
            messageState: this.writeMessageState(),
            modifiedMessage: null,
            systemMessage: null,
            error: null,
            chatState: null,
        };
    }

    async afterResponse(botMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
        const {
            content,
            anonymizedId,
            isBot
        } = botMessage;
        return {
            stageDirections: null,
            messageState: this.writeMessageState(),
            modifiedMessage: null,
            error: null,
            systemMessage: null,
            chatState: null
        };
    }


    render(): ReactElement {
        return <div>Testing</div>
    }

}
