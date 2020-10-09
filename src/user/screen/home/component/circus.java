package circus;
import java.util.Scanner;

public class Tigerbird {
    String name;
   static int mass;
    int food;
	Scanner s = new Scanner(System.in);
	void food (int food,String name )  {
		mass-= food;	
		System.out.printf(name);

		}
	public Tigerbird(int food,String name) {
		this.food=food;
		this.name=name;
	}
	
	public static void main (String[] args) {

		Tigerbird bird = new Tigerbird(2,"Bird");
		Tigerbird tiger = new Tigerbird(3,"Tiger");
		while (mass >0) {
			bird.food(bird.food,bird.name) ;
			bird.food(tiger.food,tiger.name) ;
			
		}
		
	}

}
