import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective
{
    @Input() toBePlaced : ElementRef;
    open = false;
    constructor(private renderer:Renderer2){}
    @HostListener('click') toggle()
    {
        if(!this.open)
            this.renderer.addClass(this.toBePlaced,'show');
        else
            this.renderer.removeClass(this.toBePlaced,'show');
        this.open = !this.open
    }
    
}