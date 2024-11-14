# Introducing [Astro Micro 🔬](https://astro-micro.vercel.app/)

Astro Micro is an accessible theme for Astro. It's a fork of [Mark Horn's](https://github.com/markhorn-dev) popular theme [Astro Nano](https://astro-nano-demo.vercel.app/). Like Nano, Micro comes with zero frameworks installed.

Micro adds features like [Pagefind](https://pagefind.app) for search, [Giscus](https://giscus.app) for comments, and more. For a full list of changes, see this [blog post](https://astro-micro.vercel.app/blog/00-micro-changelog).

Micro still comes with everything great about Nano — full type safety, a sitemap, an RSS feed, and Markdown + MDX support. Styled with TailwindCSS and preconfigured with system, light, and dark themes.

---

![astro-micro-image](https://github.com/trevortylerlee/astro-micro/assets/49603972/ec5bc96a-3e96-4af1-a182-7711b54c5ef6)

임시 복사

```c
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

volatile int is_run = 0;
volatile unsigned int global_second = 0;

void command(unsigned char byte);  
void data(unsigned char byte);
void init_system();                
void init_lcd();                   
void blink(unsigned int num);
void string(char font[], unsigned char n);
void move(int y, int x);
void shift_right(unsigned int num);
void shift_left(unsigned int num);

int main(void) {
   DDRA = 0xff;
   PORTA = 0x00;

   SREG = 0x80;
   EIMSK = (1 << INT6) | (1 << INT7);
   EICRB = (1 << ISC61) | (1 << ISC60) | (1 << ISC71) | (1 << ISC70);
   
    init_system();
    init_lcd();
    
    move(1, 7);
    string("TIME", 4);
    move(2, 5);
    string("00:00:00", 8);
    
    
    while(1)
    {
      if(is_run)
      {
	 int temp_second = global_second++;
	 
	 move(2, 5); data(temp_second / 3600 / 10 + 0x30);
	 data(temp_second / 3600 % 10 + 0x30);
	 temp_second = temp_second % 3600;
	 
	 move(2, 8); data(temp_second / 60 / 10 + 0x30);
	 data(temp_second / 60 % 10 + 0x30);
	 temp_second = temp_second % 60;
	 
	 move(2, 11); data(temp_second / 10 + 0x30);
	 data(temp_second % 10 + 0x30);
	 
	 _delay_ms(10);
      }
    }
}

void shift_right(unsigned int num){
   int i;
   for(i = 0; i < num; i++){
      _delay_ms(500);
      command(0b00011100);
   }
}

void shift_left(unsigned int num){
   int i;
   for(i = 0; i < num; i++){
      _delay_ms(500);
      command(0b00011000);
   }
}

void move(int y, int x) {
   unsigned char data;
   if (y == 1) data = 0x80+x-1;
   else data = 0xc0+x-1;
   command(data);
}

void string(char font[], unsigned char n) {
   unsigned char i;
   for (i = 0; i < n; i++) {
      data(font[i]);
   }
}

void blink(unsigned int num) {
   int i;
   for (i = 0;  i < num; i++) {
      _delay_ms(500);
      command(0x08);
      _delay_ms(500);
      command(0x0c);
   }
}

void command(unsigned char byte)
{
    PORTG = 0xFC;        //PORTG에 RS, RW, E 가 연결되어 있다.
    PORTC = byte;          //PORTC에 데이터버스가 연결되어 있다.
    PORTG ^= 0x04;        //E 신호를 H->L로 하기 위해
    _delay_ms(2);         //LCD 내부 동작시간
}

void data(unsigned char byte)
{
    PORTG = 0xFD;            //PORTG에 RS, RW, E 가 연결되어 있다.
    PORTC = byte;           //PORTC에 데이터버스가 연결되어 있다.
    PORTG ^= 0x04;           //E 신호를 H->L로 하기 위해
    _delay_ms(2);            //LCD 내부 동작시간
}

void init_system(void)
{
     DDRC = 0xFF;              //LCD 데이터 버스
     PORTC = 0xFF;
     DDRG = 0xFF;              //LCD 컨트롤 신호(PG2=LCD_EN, PG1=RW, PG0=RS)
     PORTG = 0xFF;
}

void init_lcd(void)
{
       _delay_ms(15); 
       command(0x38);         //Function set, 기능셋(데이터버스 8비트, 라인수:2줄)
       _delay_ms(5);        //4.1msec 이상 시간지연, 생략가능
       command(0x38);         //기능셋, 생략 가능
       _delay_us(100);      //100usec 이상 시간지연, 생략가능
       command(0x38);          //기능셋, 생략 가능
       command(0x08);          //표시 Off , 생략 가능
       command(0x01);       //화면 지우기
       command(0x06);        //엔트리모드셋
       command(0x0C);         //표시 on
}

ISR(INT6_vect)
{
   is_run = !is_run;
}

ISR(INT7_vect)
{
   is_run = 0;
   move(2, 5); 
   string("00:00:00", 8);
   global_second = 0;
}
```