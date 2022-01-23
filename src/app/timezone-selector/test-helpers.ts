import {By} from "@angular/platform-browser"

export async function selectTimezoneDropdown(fixture: any) {
  const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement
  trigger.click()
  fixture.detectChanges()
  await fixture.whenStable().then(() => {
    const selectPanel =  fixture.debugElement.query(By.css('.mat-select-panel'))
    expect(selectPanel).toBeTruthy()
  });
}

export async function selectTimezoneItem(fixture: any, itemNumber: number) {
  const options = document.querySelectorAll('.mat-select-panel mat-option')
  const secondOption = options.item(itemNumber) as HTMLElement
  secondOption.click()
  fixture.detectChanges()
  await fixture.whenStable()
}
