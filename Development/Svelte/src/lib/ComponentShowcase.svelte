<script>
    // Living reference doc for this component base — every primitive in one place so a
    // new resource can see what's available before hand-rolling its own. Replace this
    // file's usage in App.svelte with your resource's real screen when you start building.
    import Icon from './icons/Icon.svelte';
    import Button from './Button.svelte';
    import IconButton from './IconButton.svelte';
    import Input from './Input.svelte';
    import Select from './Select.svelte';
    import Dropdown from './Dropdown.svelte';
    import Toggle from './Toggle.svelte';
    import Checkbox from './Checkbox.svelte';
    import Radio from './Radio.svelte';
    import Tabs from './Tabs.svelte';
    import NavBar from './NavBar.svelte';
    import BottomNav from './BottomNav.svelte';
    import StepIndicator from './StepIndicator.svelte';
    import Pagination from './Pagination.svelte';
    import Card from './Card.svelte';
    import Badge from './Badge.svelte';
    import Chip from './Chip.svelte';
    import Avatar from './Avatar.svelte';
    import RankBadge from './RankBadge.svelte';
    import StatBadge from './StatBadge.svelte';
    import CurrencyPill from './CurrencyPill.svelte';
    import ProgressBar from './ProgressBar.svelte';
    import Rating from './Rating.svelte';
    import Toast from './Toast.svelte';
    import Modal from './Modal.svelte';
    import Tooltip from './Tooltip.svelte';

    let inputValue = $state('');
    let selectValue = $state('');
    let dropdownValue = $state('opt1');
    let toggleOn = $state(true);
    let toggleOff = $state(false);
    let checked = $state(true);
    let radioGroup = $state('a');
    let activeTab = $state('tab1');
    let activeNav = $state('home');
    let activeBottomNav = $state('menu');
    let page = $state(1);
    let ratingValue = $state(3);
    let modalOpen = $state(false);

    const swatches = ['#8B5CF6', '#C084FC', '#6D28D9', '#0D0A13', '#1A1325', '#FFFFFF', '#A1A1AA'];

    const tabs = [
        { value: 'tab1', label: 'TAB 1' },
        { value: 'tab2', label: 'TAB 2' },
        { value: 'tab3', label: 'TAB 3' },
        { value: 'tab4', label: 'TAB 4' },
    ];

    const navItems = [
        { value: 'home', label: 'หน้าหลัก', icon: 'home' },
        { value: 'cart', label: 'ร้านค้า', icon: 'cart' },
        { value: 'mail', label: 'กล่องจดหมาย', icon: 'mail' },
        { value: 'more', label: 'เพิ่มเติม', icon: 'more-horizontal' },
    ];

    const bottomNavItems = [
        { value: 'home', label: 'หน้าหลัก', icon: 'home' },
        { value: 'cart', label: 'ร้านค้า', icon: 'cart' },
        { value: 'menu', label: 'เมนู', icon: 'crown', raised: true },
        { value: 'mail', label: 'จดหมาย', icon: 'mail' },
        { value: 'user', label: 'โปรไฟล์', icon: 'user' },
    ];

    const steps = [{ label: 'ขั้นตอนที่ 1' }, { label: 'ขั้นตอนที่ 2' }, { label: 'ขั้นตอนที่ 3' }];

    const selectOptions = [
        { value: 'opt1', label: 'ตัวเลือก 1' },
        { value: 'opt2', label: 'ตัวเลือก 2' },
        { value: 'opt3', label: 'ตัวเลือก 3' },
    ];
</script>

<div class="showcase">
    <header class="showcase__header">
        <Icon name="crown" size={30} color="var(--ol-primary-light)" />
        <div>
            <h1 class="ol-h2">OVERLORD UI COMPONENTS</h1>
            <p class="ol-caption">Component base — v.2-Template-FiveM</p>
        </div>
    </header>

    <section class="showcase__section">
        <h2 class="showcase__title">Color Palette</h2>
        <div class="showcase__row">
            {#each swatches as hex (hex)}
                <div class="showcase__swatch">
                    <span class="showcase__swatch-color" style:background={hex}></span>
                    <span class="ol-caption">{hex}</span>
                </div>
            {/each}
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Typography (Kanit)</h2>
        <div class="showcase__stack">
            <p class="ol-h1">H1 Kanit Bold 32px</p>
            <p class="ol-h2">H2 Kanit Bold 24px</p>
            <p class="ol-h3">H3 Kanit SemiBold 20px</p>
            <p class="ol-body1">Body1 Kanit Regular 16px</p>
            <p class="ol-body2">Body2 Kanit Regular 14px</p>
            <p class="ol-caption">Caption Kanit Regular 12px</p>
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Buttons</h2>
        <div class="showcase__row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="disabled">Disabled</Button>
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Input Fields</h2>
        <div class="showcase__grid">
            <Input placeholder="พิมพ์ข้อความ..." bind:value={inputValue} />
            <Input placeholder="ค้นหา..." icon="search" />
            <Input placeholder="พิมพ์ข้อความ..." disabled />
            <Select options={selectOptions} bind:value={selectValue} />
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Tabs</h2>
        <Tabs {tabs} bind:active={activeTab} />
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Chip / Tag</h2>
        <div class="showcase__row">
            <Chip active>ทั้งหมด</Chip>
            <Chip>กิจกรรม</Chip>
            <Chip>ร้านค้า</Chip>
            <Chip>อาวุธ</Chip>
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Badges</h2>
        <div class="showcase__row">
            <Badge variant="new" />
            <Badge variant="hot" />
            <Badge variant="event" />
            <Badge variant="limited" />
            <Badge variant="vip" />
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Cards</h2>
        <div class="showcase__row">
            <Card title="OVERLORD" subtitle="เข้าร่วมคอมมูนิตี้สุดมันส์ไปกับพวกเรา OverLord" price="499">
                <Button size="sm" variant="primary">เข้าร่วมเลย!</Button>
            </Card>
            <Card size="small" title="WEAPON BOX" price="499">
                <IconButton icon="cart" size="sm" variant="primary" label="ซื้อ" />
            </Card>
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Toggle / Checkbox / Radio</h2>
        <div class="showcase__row showcase__row--gap">
            <Toggle bind:checked={toggleOn} />
            <Toggle bind:checked={toggleOff} />
            <Checkbox bind:checked label="ตัวเลือกที่เลือก" />
            <Checkbox label="ตัวเลือก" />
            <Radio bind:group={radioGroup} value="a" label="ตัวเลือกที่เลือก" />
            <Radio bind:group={radioGroup} value="b" label="ตัวเลือก" />
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Pagination</h2>
        <Pagination bind:page total={5} />
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Progress Bar</h2>
        <ProgressBar value={70} max={100} />
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Toast / Alert</h2>
        <div class="showcase__stack">
            <Toast variant="success" title="สำเร็จ!" message="ดำเนินการสำเร็จเรียบร้อยแล้ว" />
            <Toast variant="warning" title="คำเตือน!" message="กรุณาตรวจสอบข้อมูลอีกครั้ง" />
            <Toast variant="error" title="เกิดข้อผิดพลาด!" message="ไม่สามารถดำเนินการได้ในขณะนี้" />
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Modal</h2>
        <Button variant="secondary" onclick={() => (modalOpen = true)}>เปิด Modal</Button>
        <Modal
            bind:open={modalOpen}
            icon="warning"
            title="ยืนยันการดำเนินการ"
            description="คุณต้องการดำเนินการต่อหรือไม่?"
        >
            <Button variant="secondary" onclick={() => (modalOpen = false)}>ยกเลิก</Button>
            <Button variant="primary" onclick={() => (modalOpen = false)}>ยืนยัน</Button>
        </Modal>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Tooltip</h2>
        <Tooltip label="ข้อมูลเพิ่มเติม">
            <IconButton icon="info" size="sm" variant="surface" label="ข้อมูล" />
        </Tooltip>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Navigation Bar</h2>
        <NavBar items={navItems} bind:active={activeNav} />
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Bottom Nav (Mobile)</h2>
        <div class="showcase__bottomnav-frame">
            <BottomNav items={bottomNavItems} bind:active={activeBottomNav} />
        </div>
    </section>

    <section class="showcase__section">
        <h2 class="showcase__title">Miscellaneous</h2>
        <div class="showcase__row showcase__row--gap">
            <Avatar status="online" />
            <RankBadge label="OVERLORD" />
            <StatBadge icon="skull" label="KILLS" value="1,234" />
            <CurrencyPill amount={99999} onAdd={() => {}} />
            <StepIndicator {steps} current={2} />
            <Dropdown options={selectOptions} bind:value={dropdownValue} />
            <Rating value={ratingValue} interactive onchange={(v) => (ratingValue = v)} />
        </div>
    </section>
</div>

<style>
    .showcase {
        height: 100%;
        overflow-y: auto;
        padding: calc(28 * var(--px-to-vh) * var(--scale));
        display: flex;
        flex-direction: column;
        gap: calc(28 * var(--px-to-vh) * var(--scale));
        background: var(--ol-bg);
    }

    .showcase__header {
        display: flex;
        align-items: center;
        gap: calc(12 * var(--px-to-vh) * var(--scale));
    }

    .showcase__section {
        display: flex;
        flex-direction: column;
        gap: calc(14 * var(--px-to-vh) * var(--scale));
    }

    .showcase__title {
        margin: 0;
        font-size: var(--ol-fs-body2);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ol-primary-light);
    }

    .showcase__row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: calc(12 * var(--px-to-vh) * var(--scale));
    }

    .showcase__row--gap {
        gap: calc(20 * var(--px-to-vh) * var(--scale));
    }

    .showcase__stack {
        display: flex;
        flex-direction: column;
        gap: calc(10 * var(--px-to-vh) * var(--scale));
    }

    .showcase__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(calc(180 * var(--px-to-vh) * var(--scale)), 1fr));
        gap: calc(14 * var(--px-to-vh) * var(--scale));
    }

    .showcase__swatch {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(6 * var(--px-to-vh) * var(--scale));
    }

    .showcase__swatch-color {
        width: calc(56 * var(--px-to-vh) * var(--scale));
        height: calc(56 * var(--px-to-vh) * var(--scale));
        border-radius: var(--ol-radius-md);
        border: calc(1 * var(--px-to-vh) * var(--scale)) solid var(--ol-border);
    }

    .showcase__bottomnav-frame {
        max-width: calc(420 * var(--px-to-vh) * var(--scale));
    }
</style>
