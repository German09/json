
/**
 * INTERNAL, DO NOT USE. Code may change at any time.
 */
interface Fragment {
    key: string | null;
    first: null;
    c: () => void;
    l: (nodes: any) => void;
    h: () => void;
    m: (target: HTMLElement, anchor: any) => void;
    p: (ctx: any, dirty: any) => void;
    r: () => void;
    f: () => void;
    a: () => void;
    i: (local: any) => void;
    o: (local: any) => void;
    d: (detaching: 0 | 1) => void;
}
interface T$$ {
    dirty: number[];
    ctx: null | any;
    bound: any;
    update: () => void;
    callbacks: any;
    after_update: any[];
    props: Record<string, 0 | string>;
    fragment: null | false | Fragment;
    not_equal: any;
    before_update: any[];
    context: Map<any, any>;
    on_mount: any[];
    on_destroy: any[];
    skip_bound: boolean;
    on_disconnect: any[];
    root: Element | ShadowRoot;
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
declare class SvelteComponent {
    $$: T$$;
    $$set?: ($$props: any) => void;
    $destroy(): void;
    $on(type: any, callback: any): () => void;
    $set($$props: any): void;
}

declare type Props = Record<string, any>;
interface ComponentConstructorOptions<Props extends Record<string, any> = Record<string, any>> {
    target: Element | ShadowRoot;
    anchor?: Element;
    props?: Props;
    context?: Map<any, any>;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}
interface SvelteComponentDev$1 {
    $set(props?: Props): void;
    $on(event: string, callback: (event: any) => void): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
declare class SvelteComponentDev$1 extends SvelteComponent {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: any;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: any;
    constructor(options: ComponentConstructorOptions);
    $capture_state(): void;
    $inject_state(): void;
}
interface SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> {
    $set(props?: Partial<Props>): void;
    $on<K extends Extract<keyof Events, string>>(type: K, callback: (e: Events[K]) => void): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
declare class SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> extends SvelteComponentDev$1 {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: Events;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: Slots;
    constructor(options: ComponentConstructorOptions<Props>);
}

type JSONPointer = string // a string containing a JSONPointer like '/array/3/name'
type JSONPath = string[] // an array like ['array', '3', 'name']

type JSONValue = string | number | boolean | null
type JSONObject = { [key: string]: JSONData }
type JSONArray = JSONData[]
type JSONData = JSONObject | JSONArray | JSONValue

interface JSONPatchAdd {
  op: 'add'
  path: JSONPointer
  value: JSONData
}

interface JSONPatchRemove {
  op: 'remove'
  path: JSONPointer
}

interface JSONPatchReplace {
  op: 'replace'
  path: JSONPointer
  value: JSONData
}

interface JSONPatchCopy {
  op: 'copy'
  path: JSONPointer
  from: JSONPointer
}

interface JSONPatchMove {
  op: 'move'
  path: JSONPointer
  from: JSONPointer
}

interface JSONPatchTest {
  op: 'test'
  path: JSONPointer
  value: JSONData
}

type JSONPatchOperation =
  | JSONPatchAdd
  | JSONPatchRemove
  | JSONPatchReplace
  | JSONPatchCopy
  | JSONPatchMove
  | JSONPatchTest

type JSONPatchDocument = JSONPatchOperation[]

type JSONPatchOptions = {
  before?: (json: JSONData, operation: JSONPatchOperation)
    => { json?: JSONData, operation?: JSONPatchOperation }

  after?: (json: JSONData, operation: JSONPatchOperation, previousJson: JSONData)
    => JSONData
}

type RevertJSONPatchOptions = {
  before?: (json: JSONData, operation: JSONPatchOperation, revertOperations: JSONPatchOperation[])
    => { json?: JSONData, revertOperations?: JSONPatchOperation[] }
}

declare function immutableJSONPatch(json: JSONData, operations: JSONPatchDocument, options?: JSONPatchOptions) : JSONData
declare function revertJSONPatch(json: JSONData, operations: JSONPatchDocument, options?: RevertJSONPatchOptions) : JSONPatchDocument

// utils
declare function parsePath(json: JSONData, pointer: JSONPointer) : JSONPath
declare function parseFrom(fromPointer: JSONPointer) : JSONPath
declare function parseJSONPointer(pointer: JSONPointer) : JSONPath
declare function compileJSONPointer(path: JSONPath) : JSONPointer
declare function compileJSONPointerProp(pathProp: string | number) : JSONPointer
declare function getIn(json: JSONData, path: JSONPath) : JSONData
declare function setIn(json: JSONData, path: JSONPath, value: JSONData, createPath?: boolean) : JSONData
declare function updateIn(json: JSONData, path: JSONPath, callback: (json: JSONData) => JSONData) : JSONData
declare function deleteIn(json: JSONData, path: JSONPath) : JSONData
declare function existsIn(json: JSONData, path: JSONPath) : boolean
declare function insertAt(json: JSONData, path: JSONPath, value: JSONData) : JSONData

declare type TextContent = {
    text: string;
} | {
    json: undefined;
    text: string;
};
declare type JSONContent = {
    json: JSONData;
} | {
    json: JSONData;
    text: undefined;
};
declare type Content = JSONContent | TextContent;
interface VisibleSection {
    start: number;
    end: number;
}
declare enum Mode {
    text = "text",
    tree = "tree"
}
declare enum SelectionType {
    after = "after",
    inside = "inside",
    key = "key",
    value = "value",
    multi = "multi"
}
declare enum CaretType {
    after = "after",
    key = "key",
    value = "value",
    inside = "inside"
}
interface CaretPosition {
    path: JSONPath;
    type: CaretType;
}
interface DocumentState {
    expandedMap: JSONPointerMap<boolean>;
    enforceStringMap: JSONPointerMap<boolean>;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]>;
    selection: JSONSelection | undefined;
}
interface JSONPatchResult {
    json: JSONData;
    previousJson: JSONData;
    undo: JSONPatchDocument;
    redo: JSONPatchDocument;
}
declare type AfterPatchCallback = (patchedJson: JSONData, patchedState: DocumentState) => {
    json?: JSONData;
    state?: DocumentState;
};
interface MultiSelection {
    type: SelectionType.multi;
    paths: JSONPath[];
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface AfterSelection {
    type: SelectionType.after;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface InsideSelection {
    type: SelectionType.inside;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface KeySelection {
    type: SelectionType.key;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
    edit?: boolean;
}
interface ValueSelection {
    type: SelectionType.value;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
    edit?: boolean;
}
declare type JSONSelection = MultiSelection | AfterSelection | InsideSelection | KeySelection | ValueSelection;
declare type JSONPointerMap<T> = {
    [pointer: JSONPointer]: T;
};
declare type ClipboardValues = Array<{
    key: string;
    value: JSONData;
}>;
interface FontAwesomeIcon {
    prefix: string;
    iconName: string;
    icon: [number, number, Array<number | string>, string, string];
}
interface DropdownButtonItem {
    text: string;
    onClick: () => void;
    icon?: FontAwesomeIcon;
    title?: string;
    disabled?: boolean;
}
interface MenuButtonItem {
    onClick: () => void;
    icon?: FontAwesomeIcon;
    text?: string;
    title?: string;
    className?: string;
    disabled?: boolean;
}
interface MenuSeparatorItem {
    separator: true;
}
interface MenuSpaceItem {
    space: true;
}
declare type MenuItem = MenuButtonItem | MenuSeparatorItem | MenuSpaceItem;
interface MessageAction {
    text: string;
    title: string;
    icon?: FontAwesomeIcon;
    onClick?: () => void;
    onMouseDown?: () => void;
    disabled?: boolean;
}
declare enum ValidationSeverity {
    info = "info",
    warning = "warning",
    error = "error"
}
interface ValidationError {
    path: JSONPath;
    message: string;
    severity: ValidationSeverity;
}
interface NestedValidationError extends ValidationError {
    isChildError?: boolean;
}
declare type Validator = (json: JSONData) => ValidationError[];
interface ParseError {
    position: number | null;
    line: number | null;
    column: number | null;
    message: string;
}
interface ContentParseError {
    parseError: ParseError;
    isRepairable: boolean;
}
interface ContentValidationErrors {
    validationErrors: ValidationError[];
}
declare type ContentErrors = ContentParseError | ContentValidationErrors;
interface RichValidationError extends ValidationError {
    line?: number;
    column?: number;
    from: number;
    to: number;
    actions: Array<{
        name: string;
        apply: () => void;
    }> | null;
}
interface TextLocation {
    path: JSONPath;
    line: number;
    column: number;
    from: number;
    to: number;
}
interface Section {
    start: number;
    end: number;
}
interface QueryLanguage {
    id: string;
    name: string;
    description: string;
    createQuery: (json: JSONData, queryOptions: QueryLanguageOptions) => string;
    executeQuery: (json: JSONData, query: string) => JSONData;
}
interface QueryLanguageOptions {
    filter?: {
        path?: string[];
        relation?: '==' | '!=' | '<' | '<=' | '>' | '>=';
        value?: string;
    };
    sort?: {
        path?: string[];
        direction?: 'asc' | 'desc';
    };
    projection?: {
        paths?: string[][];
    };
}
declare type OnChangeQueryLanguage = (queryLanguageId: string) => void;
interface OnChangeStatus {
    contentErrors: ContentErrors;
    patchResult: JSONPatchResult | null;
}
declare type OnChange = ((content: Content, previousContent: Content, OnChangeStatus: any) => void) | null;
declare type OnSelect = (selection: JSONSelection) => void;
declare type OnPatch = (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => void;
declare type OnSort = (operations: JSONPatchDocument) => void;
declare type OnFind = (findAndReplace: boolean) => void;
declare type OnPaste = (pastedText: string) => void;
declare type OnPasteJson = (pastedJson: {
    path: JSONPath;
    contents: JSONData;
}) => void;
declare type OnRenderValue = (props: RenderValueProps) => RenderValueComponentDescription[];
declare type OnClassName = (path: JSONPath, value: JSONData) => string | undefined;
declare type OnChangeMode = (mode: Mode) => void;
declare type OnContextMenu = (contextMenuProps: AbsolutePopupOptions) => void;
declare type OnRenderMenu = (mode: 'tree' | 'text' | 'repair', items: MenuItem[]) => MenuItem[] | undefined | void;
declare type OnError = (error: Error) => void;
declare type OnFocus = () => void;
declare type OnBlur = () => void;
interface SearchResult {
    items: ExtendedSearchResultItem[];
    itemsMap: JSONPointerMap<ExtendedSearchResultItem[]>;
    activeItem: ExtendedSearchResultItem | undefined;
    activeIndex: number | -1;
}
declare enum SearchField {
    key = "key",
    value = "value"
}
interface SearchResultItem {
    path: JSONPath;
    field: SearchField;
    fieldIndex: number;
    start: number;
    end: number;
}
interface ExtendedSearchResultItem extends SearchResultItem {
    active: boolean;
}
interface ValueNormalization {
    escapeValue: (unescapedValue: unknown) => string;
    unescapeValue: (escapedValue: string) => string;
}
declare type PastedJson = {
    contents: JSONData;
    path: JSONPath;
} | undefined;
declare type EscapeValue = (value: JSONData) => string;
declare type UnescapeValue = (escapedValue: string) => string;
interface DragInsideProps {
    json: JSONData;
    selection: JSONSelection;
    deltaY: number;
    items: Array<{
        path: JSONPath;
        height: number;
    }>;
}
declare type DragInsideAction = {
    beforePath: JSONPath;
    offset: number;
} | {
    append: true;
    offset: number;
};
interface RenderedItem {
    path: JSONPath;
    height: number;
}
interface HistoryItem {
    undo: {
        patch: JSONPatchDocument | undefined;
        json: JSONData | undefined;
        text: string | undefined;
        state: DocumentState;
        textIsRepaired: boolean;
    };
    redo: {
        patch: JSONPatchDocument | undefined;
        json: JSONData | undefined;
        text: string | undefined;
        state: DocumentState;
        textIsRepaired: boolean;
    };
}
declare type InsertType = 'value' | 'object' | 'array' | 'structure';
interface PopupEntry {
    id: number;
    component: SvelteComponentTyped;
    props: Record<string, unknown>;
    options: AbsolutePopupOptions;
}
interface AbsolutePopupOptions {
    anchor?: Element;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    offsetTop?: number;
    offsetLeft?: number;
    showTip?: boolean;
    closeOnOuterClick?: boolean;
    onClose?: () => void;
}
interface JSONEditorPropsOptional {
    content?: Content;
    readOnly?: boolean;
    indentation?: number | string;
    tabSize?: number;
    mode?: Mode;
    mainMenuBar?: boolean;
    navigationBar?: boolean;
    statusBar?: boolean;
    escapeControlCharacters?: boolean;
    escapeUnicodeCharacters?: boolean;
    validator?: Validator;
    queryLanguages?: QueryLanguage[];
    queryLanguageId?: string;
    onChangeQueryLanguage?: OnChangeQueryLanguage;
    onChange?: OnChange;
    onRenderValue?: OnRenderValue;
    onClassName?: OnClassName;
    onRenderMenu?: OnRenderMenu;
    onChangeMode?: OnChangeMode;
    onError?: OnError;
    onFocus?: OnFocus;
    onBlur?: OnBlur;
}
interface TreeModeContext {
    readOnly: boolean;
    normalization: ValueNormalization;
    getJson: () => JSONData;
    getDocumentState: () => DocumentState;
    findElement: (path: JSONPath) => Element | null;
    focus: () => void;
    onPatch: (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
    onInsert: (type: InsertType) => void;
    onExpand: (path: JSONPath, expanded: boolean, recursive?: boolean) => void;
    onSelect: OnSelect;
    onFind: OnFind;
    onExpandSection: (path: JSONPath, section: Section) => void;
    onPasteJson: (newPastedJson: PastedJson) => void;
    onRenderValue: OnRenderValue;
    onContextMenu: OnContextMenu;
    onClassName: OnClassName;
    onDrag: (event: Event) => void;
    onDragEnd: () => void;
}
interface RenderValuePropsOptional {
    path?: JSONPath;
    value?: JSONData;
    readOnly?: boolean;
    enforceString?: boolean;
    selection?: JSONSelection;
    searchResultItems?: SearchResultItem[];
    isSelected?: boolean;
    isEditing?: boolean;
    normalization?: ValueNormalization;
    onPatch?: TreeModeContext['onPatch'];
    onPasteJson?: OnPasteJson;
    onSelect?: OnSelect;
    onFind?: OnFind;
    focus?: () => void;
}
interface RenderValueProps extends RenderValuePropsOptional {
    path: JSONPath;
    value: JSONData;
    readOnly: boolean;
    enforceString: boolean;
    selection: JSONSelection | undefined;
    searchResultItems: SearchResultItem[] | undefined;
    isSelected: boolean;
    isEditing: boolean;
    normalization: ValueNormalization;
    onPatch: TreeModeContext['onPatch'];
    onPasteJson: OnPasteJson;
    onSelect: OnSelect;
    onFind: OnFind;
    focus: () => void;
}
interface JSONNodeProp {
    key: string;
    value: JSONData;
    path: JSONPath;
    pointer: JSONPointer;
    expandedMap: JSONPointerMap<boolean> | undefined;
    enforceStringMap: JSONPointerMap<boolean> | undefined;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]> | undefined;
    validationErrorsMap: JSONPointerMap<NestedValidationError> | undefined;
    keySearchResultItemsMap: ExtendedSearchResultItem[] | undefined;
    valueSearchResultItemsMap: JSONPointerMap<ExtendedSearchResultItem[]> | undefined;
    selection: JSONSelection | undefined;
}
interface JSONNodeItem {
    index: number;
    value: JSONData;
    path: JSONPath;
    pointer: JSONPointer;
    expandedMap: JSONPointerMap<boolean> | undefined;
    enforceStringMap: JSONPointerMap<boolean> | undefined;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]> | undefined;
    validationErrorsMap: JSONPointerMap<NestedValidationError> | undefined;
    searchResultItemsMap: JSONPointerMap<ExtendedSearchResultItem[]> | undefined;
    selection: JSONSelection | undefined;
}
interface DraggingState {
    initialTarget: Element;
    initialClientY: number;
    initialContentTop: number;
    selectionStartIndex: number;
    selectionItemsCount: number;
    items: RenderedItem[] | null;
    offset: number;
    didMoveItems: boolean;
}
interface RenderValueComponentDescription {
    component: SvelteComponentTyped;
    props: Record<string, unknown>;
}
interface TransformModalOptions {
    id?: string;
    selectedPath?: JSONPath;
    onTransform?: (state: {
        operations: JSONPatchDocument;
        json: JSONData;
        transformedJson: JSONData;
    }) => void;
    onClose?: () => void;
}
interface TransformModalCallback extends TransformModalOptions {
    id: string;
    selectedPath: JSONPath;
    json: JSONData;
    onTransform: (state: {
        operations: JSONPatchDocument;
        json: JSONData;
        transformedJson: JSONData;
    }) => void;
    onClose: () => void;
}
interface SortModalCallback {
    id: string;
    json: JSONData;
    selectedPath: JSONPath;
    onSort: OnSort;
    onClose: () => void;
}

declare const __propDef$8: {
    props: {
        content?: Content;
        readOnly?: boolean;
        indentation?: number | string;
        tabSize?: number;
        mode?: Mode;
        mainMenuBar?: boolean;
        navigationBar?: boolean;
        statusBar?: boolean;
        escapeControlCharacters?: boolean;
        escapeUnicodeCharacters?: boolean;
        validator?: Validator | null;
        queryLanguages?: QueryLanguage[];
        queryLanguageId?: string;
        onChangeQueryLanguage?: OnChangeQueryLanguage;
        onChange?: OnChange;
        onRenderValue?: OnRenderValue;
        onClassName?: OnClassName;
        onRenderMenu?: OnRenderMenu;
        onChangeMode?: OnChangeMode;
        onError?: OnError;
        onFocus?: OnFocus;
        onBlur?: OnBlur;
        get?: () => Content;
        set?: (newContent: Content) => void;
        update?: (updatedContent: Content) => void;
        patch?: (operations: JSONPatchDocument) => void;
        expand?: (callback?: (path: JSONPath) => boolean) => void;
        transform?: (options: TransformModalOptions) => void;
        validate?: () => ContentErrors;
        acceptAutoRepair?: () => Content;
        scrollTo?: (path: JSONPath) => void;
        findElement?: (path: JSONPath) => Element;
        focus?: () => void;
        refresh?: () => void;
        updateProps?: (props: JSONEditorPropsOptional) => void;
        destroy?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type JsonEditorProps = typeof __propDef$8.props;
declare type JsonEditorEvents = typeof __propDef$8.events;
declare type JsonEditorSlots = typeof __propDef$8.slots;
declare class JsonEditor extends SvelteComponentTyped<JsonEditorProps, JsonEditorEvents, JsonEditorSlots> {
    get get(): () => Content;
    get set(): (newContent: Content) => void;
    get update(): (updatedContent: Content) => void;
    get patch(): (operations: JSONPatchDocument) => void;
    get expand(): (callback?: (path: JSONPath) => boolean) => void;
    get transform(): (options: TransformModalOptions) => void;
    get validate(): () => ContentErrors;
    get acceptAutoRepair(): () => Content;
    get scrollTo(): (path: JSONPath) => void;
    get findElement(): (path: JSONPath) => Element;
    get focus(): () => void;
    get refresh(): () => void;
    get updateProps(): (props: JSONEditorPropsOptional) => void;
    get destroy(): () => void;
}

declare const __propDef$7: {
    props: {
        id: string;
        json: JSONData;
        selectedPath: JSONPath;
        onSort: OnSort;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type SortModalProps = typeof __propDef$7.props;
declare type SortModalEvents = typeof __propDef$7.events;
declare type SortModalSlots = typeof __propDef$7.slots;
declare class SortModal extends SvelteComponentTyped<SortModalProps, SortModalEvents, SortModalSlots> {
}

declare const __propDef$6: {
    props: {
        id?: string;
        json: JSONData;
        selectedPath?: JSONPath;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        queryLanguages: QueryLanguage[];
        queryLanguageId: string;
        onChangeQueryLanguage: OnChangeQueryLanguage;
        onRenderValue: OnRenderValue;
        onClassName: OnClassName;
        onTransform: OnPatch;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type TransformModalProps = typeof __propDef$6.props;
declare type TransformModalEvents = typeof __propDef$6.events;
declare type TransformModalSlots = typeof __propDef$6.slots;
declare class TransformModal extends SvelteComponentTyped<TransformModalProps, TransformModalEvents, TransformModalSlots> {
}

declare const __propDef$5: {
    props: {
        path: JSONPath;
        value: JSONData;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type BooleanToggleProps = typeof __propDef$5.props;
declare type BooleanToggleEvents = typeof __propDef$5.events;
declare type BooleanToggleSlots = typeof __propDef$5.slots;
declare class BooleanToggle extends SvelteComponentTyped<BooleanToggleProps, BooleanToggleEvents, BooleanToggleSlots> {
}

declare const __propDef$4: {
    props: {
        path: JSONPath;
        value: string;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type ColorPickerProps = typeof __propDef$4.props;
declare type ColorPickerEvents = typeof __propDef$4.events;
declare type ColorPickerSlots = typeof __propDef$4.slots;
declare class ColorPicker extends SvelteComponentTyped<ColorPickerProps, ColorPickerEvents, ColorPickerSlots> {
}

declare const __propDef$3: {
    props: {
        path: JSONPath;
        value: JSONData;
        normalization: ValueNormalization;
        enforceString: boolean;
        onPatch: OnPatch;
        onPasteJson: OnPasteJson;
        onSelect: OnSelect;
        onFind: OnFind;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type EditableValueProps = typeof __propDef$3.props;
declare type EditableValueEvents = typeof __propDef$3.events;
declare type EditableValueSlots = typeof __propDef$3.slots;
declare class EditableValue extends SvelteComponentTyped<EditableValueProps, EditableValueEvents, EditableValueSlots> {
}

declare const __propDef$2: {
    props: {
        path: JSONPath;
        value: JSONData;
        readOnly: boolean;
        isSelected: boolean;
        onPatch: OnPatch;
        options: {
            value: unknown;
            text: string;
        }[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type EnumValueProps = typeof __propDef$2.props;
declare type EnumValueEvents = typeof __propDef$2.events;
declare type EnumValueSlots = typeof __propDef$2.slots;
declare class EnumValue extends SvelteComponentTyped<EnumValueProps, EnumValueEvents, EnumValueSlots> {
}

declare const __propDef$1: {
    props: {
        path: JSONPath;
        value: JSONData;
        readOnly: boolean;
        normalization: ValueNormalization;
        onSelect: OnSelect;
        searchResultItems: ExtendedSearchResultItem[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type ReadonlyValueProps = typeof __propDef$1.props;
declare type ReadonlyValueEvents = typeof __propDef$1.events;
declare type ReadonlyValueSlots = typeof __propDef$1.slots;
declare class ReadonlyValue extends SvelteComponentTyped<ReadonlyValueProps, ReadonlyValueEvents, ReadonlyValueSlots> {
}

declare const __propDef: {
    props: {
        value: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type TimestampTagProps = typeof __propDef.props;
declare type TimestampTagEvents = typeof __propDef.events;
declare type TimestampTagSlots = typeof __propDef.slots;
declare class TimestampTag extends SvelteComponentTyped<TimestampTagProps, TimestampTagEvents, TimestampTagSlots> {
}

declare function renderValue({ path, value, readOnly, enforceString, searchResultItems, isEditing, normalization, onPatch, onPasteJson, onSelect, onFind, focus }: RenderValueProps): RenderValueComponentDescription[];

/**
 * Search the JSON schema for enums defined at given props.path. If found,
 * return an EnumValue renderer. If not found, return null. In that case you
 * have to fallback on the default valueRender function
 */
declare function renderJSONSchemaEnum(props: RenderValueProps, schema: JSONData, schemaDefinitions: JSONData): RenderValueComponentDescription[];

/**
 * Create a JSON Schema validator powered by Ajv.
 * @param schema
 * @param [schemaDefinitions=undefined]
 *                    An object containing JSON Schema definitions
 *                    which can be referenced using $ref
 * @return Returns a validation function
 */
declare function createAjvValidator(schema: JSONData, schemaDefinitions?: JSONData): Validator;

declare const lodashQueryLanguage: QueryLanguage;

declare const javascriptQueryLanguage: QueryLanguage;

declare const jmespathQueryLanguage: QueryLanguage;

/**
 * Find enum options for given path in a JSONSchema
 * @param {JSON} schema
 * @param {JSON} [schemaDefinitions=undefined]
 * @param {Path} path
 * @returns {Array<any> | null}
 */
declare function getJSONSchemaOptions(schema: any, schemaDefinitions: any, path: any): any;
/**
 * find an enum definition in a JSON schema, as property `enum` or inside
 * one of the schemas composites (`oneOf`, `anyOf`, `allOf`)
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param  {Object} schema
 * @return {Array | null} Returns the enum when found, null otherwise.
 * @private
 */
declare function findEnum(schema: any): any;
/**
 * Return the part of a JSON schema matching given path.
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param {JSON} topLevelSchema
 * @param {JSON} schemaDefinitions
 * @param {Array.<string | number>} path
 * @param {Object} currentSchema
 * @return {Object | null}
 * @private
 */
declare function findSchema(topLevelSchema: any, schemaDefinitions: any, path: any, currentSchema?: any): any;

/**
 * Check whether content contains text (and not JSON)
 */
declare function isTextContent(content: Content): content is TextContent;
/**
 * Returns true when the (estimated) size of the contents exceeds the
 * provided maxSize.
 * @param content
 * @param maxSize  Maximum content size in bytes
 */
declare function isLargeContent(content: Content, maxSize: number): boolean;
/**
 * A rough, fast estimation on whether a document is larger than given size
 * when serialized.
 *
 * maxSize is an optional max size in bytes. When reached, size estimation will
 * be cancelled. This is useful when you're only interested in knowing whether
 * the size exceeds a certain maximum size.
 */
declare function estimateSerializedSize(content: Content, maxSize?: number): number;

declare function isAfterSelection(selection: JSONSelection | undefined): selection is AfterSelection;
declare function isInsideSelection(selection: JSONSelection | undefined): selection is InsideSelection;
declare function isKeySelection(selection: JSONSelection | undefined): selection is KeySelection;
declare function isValueSelection(selection: JSONSelection | undefined): selection is ValueSelection;
declare function isMultiSelection(selection: JSONSelection | undefined): selection is MultiSelection;
declare function createKeySelection(path: JSONPath, edit: boolean): KeySelection;
declare function createValueSelection(path: JSONPath, edit: boolean): ValueSelection;
declare function createInsideSelection(path: JSONPath): InsideSelection;
declare function createAfterSelection(path: JSONPath): AfterSelection;
declare function createMultiSelection(json: JSONData, anchorPath: JSONPath, focusPath: JSONPath): MultiSelection;
declare function isEditingSelection(selection: JSONSelection): boolean;

export { AbsolutePopupOptions, AfterPatchCallback, AfterSelection, BooleanToggle, CaretPosition, CaretType, ClipboardValues, ColorPicker, Content, ContentErrors, ContentParseError, ContentValidationErrors, DocumentState, DragInsideAction, DragInsideProps, DraggingState, DropdownButtonItem, EditableValue, EnumValue, EscapeValue, ExtendedSearchResultItem, FontAwesomeIcon, HistoryItem, InsertType, InsideSelection, JSONContent, JSONData, JsonEditor as JSONEditor, JSONEditorPropsOptional, JSONNodeItem, JSONNodeProp, JSONPatchDocument, JSONPatchResult, JSONPath, JSONPointer, JSONPointerMap, JSONSelection, KeySelection, MenuButtonItem, MenuItem, MenuSeparatorItem, MenuSpaceItem, MessageAction, Mode, MultiSelection, NestedValidationError, OnBlur, OnChange, OnChangeMode, OnChangeQueryLanguage, OnChangeStatus, OnClassName, OnContextMenu, OnError, OnFind, OnFocus, OnPaste, OnPasteJson, OnPatch, OnRenderMenu, OnRenderValue, OnSelect, OnSort, ParseError, PastedJson, PopupEntry, QueryLanguage, QueryLanguageOptions, ReadonlyValue, RenderValueComponentDescription, RenderValueProps, RenderValuePropsOptional, RenderedItem, RichValidationError, SearchField, SearchResult, SearchResultItem, Section, SelectionType, SortModal, SortModalCallback, TextContent, TextLocation, TimestampTag, TransformModal, TransformModalCallback, TransformModalOptions, TreeModeContext, UnescapeValue, ValidationError, ValidationSeverity, Validator, ValueNormalization, ValueSelection, VisibleSection, compileJSONPointer, compileJSONPointerProp, createAfterSelection, createAjvValidator, createInsideSelection, createKeySelection, createMultiSelection, createValueSelection, deleteIn, estimateSerializedSize, existsIn, findEnum, findSchema, getIn, getJSONSchemaOptions, immutableJSONPatch, insertAt, isAfterSelection, isEditingSelection, isInsideSelection, isKeySelection, isLargeContent, isMultiSelection, isTextContent, isValueSelection, javascriptQueryLanguage, jmespathQueryLanguage, lodashQueryLanguage, parseFrom, parseJSONPointer, parsePath, renderJSONSchemaEnum, renderValue, revertJSONPatch, setIn, updateIn };
