'use strict';

class Tabs {
    #rootEl;

    static TABS_CLASS = 'tabs';
    static TABS_ACTIVE_ID = '#tabs-active';
    static TABS_ITEM_CLASS = 'tabs-item';
    static LINKS_CLASS = 'tabs-links';
    static LINKS_ACTIVE_CLASS = 'tabs-links-active';
    static CONTENT_CLASS = 'tabs-content';
    static CONTENT_ACTIVE_CLASS = 'tabs-content-active';

    constructor(rootEl) {
        this.#rootEl = rootEl;

        this.defineStyle();
        this.defineEvents();
        this.defineActiveContent();
    }

    defineStyle() {
        const tabs = this.#rootEl;
        const tabsItems = this.#rootEl.children;

        tabs.classList.add(Tabs.TABS_CLASS);

        for (let itemEl of tabsItems) {
            const [linksEl, contentEl] = itemEl.children;

            itemEl.classList.add(Tabs.TABS_ITEM_CLASS);
            linksEl.classList.add(Tabs.LINKS_CLASS);
            contentEl.classList.add(Tabs.CONTENT_CLASS);
        }
    }

    defineEvents() {
        this.#rootEl.addEventListener('click', (e) => this.onTabsElClick(e));
    }

    defineActiveContent() {
        const activeLinks = this.findActiveLinks();
        const activeContent = this.findActiveContent();
        const firstEl = this.#rootEl.querySelector(Tabs.TABS_ACTIVE_ID);
        const [linksEl, contentEl] = firstEl.children;

        if (!activeLinks && !activeContent) {
            this.activeLinks(linksEl);
            this.activeContent(contentEl);
        }
    }

    onTabsElClick(e) {
        if (e.target.classList.contains(Tabs.LINKS_CLASS)) {
            const linksEl = e.target;
            const contentEl = this.findContent(linksEl);
            const activeTitle = this.findActiveLinks();
            const activeBody = this.findActiveContent();

            if (activeTitle && activeBody) {
                this.inactiveLinks(activeTitle);
                this.inactiveContent(activeBody);
            }

            this.activeLinks(linksEl);
            this.activeContent(contentEl);
        }
    }

    findContent(el) {
        const itemEl = el.closest('.' + Tabs.TABS_ITEM_CLASS);

        return itemEl.querySelector('.' + Tabs.CONTENT_CLASS);
    }

    findActiveLinks() {
        return this.#rootEl.querySelector('.' + Tabs.LINKS_ACTIVE_CLASS);
    }

    findActiveContent() {
        return this.#rootEl.querySelector('.' + Tabs.CONTENT_ACTIVE_CLASS);
    }

    activeLinks(el) {
        el.classList.add(Tabs.LINKS_ACTIVE_CLASS);
    }

    activeContent(el) {
        el.classList.add(Tabs.CONTENT_ACTIVE_CLASS);
    }

    inactiveLinks(el) {
        el.classList.remove(Tabs.LINKS_ACTIVE_CLASS);
    }

    inactiveContent(el) {
        el.classList.remove(Tabs.CONTENT_ACTIVE_CLASS);
    }
}

const tabsEl = document.querySelector('#tabs');
new Tabs(tabsEl);
