using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ESGScoreController : ControllerBase
    {
        private readonly List<ESGScore> scores = new();
        private static HttpClient client = new();
        private readonly List<string> fueltypeIds = new() { "F4", "F1", "F11", "F12", "F9", "F2", "F21", "F22", "F7", "F3", "F50" };
        public ESGScoreController()
        {
            scores.Add(new ESGScore()
            {
                Naam = "Tesla",
                ESGBedrijf = 63,
                Environment = 71,
                Social = 56,
                Governance = 63,
            });
        }

        //environment, governance , Product,Social
        [HttpGet]
        public IActionResult getItems()
        {
            return Ok(scores);
        }

        [HttpGet("{zoekterm}")]
        public IActionResult getItemByName(string zoekterm)
        {
            return Ok(scores.Where(x => x.Naam.Contains(zoekterm)).ToList());
        }


        [HttpGet]
        [Route("api/ESGScore/getModelsByBrand")]
        public async Task<IActionResult> GetCardBrands(string merk)
        {
            Wrapper autos = await client.GetFromJsonAsync<Wrapper>($"https://ecoscore.be/xhr/vehicles.json?by_make={merk}");
            List<String> types = autos.Vehicles.Select(x => x.type).Distinct().ToList();
            return Ok(types);
        }

        [HttpGet]
        [Route("api/ESGScore/getProductScore")]
        public async Task<IActionResult> GetProductScore(string merk, string type)
        {
            Wrapper autos = await client.GetFromJsonAsync<Wrapper>($"https://ecoscore.be/xhr/vehicles.json?by_make={merk}&by_type={type}");
            List<int> scores = new();
            foreach (var fuelid in fueltypeIds)
            {
                Vehicle fuelAuto = autos.Vehicles.Where(x => x.fuel.id == fuelid).OrderBy(x => x.year).FirstOrDefault();
                if (fuelAuto != null)
                {
                    scores.Add(fuelAuto.envscav);
                }
            }

            return Ok(new { scores, avg = scores.Average() });
        }



    }

    public class ESGScore
    {
        public string Naam { get; set; }
        public int ESGBedrijf { get; set; }
        public int Governance { get; set; }
        public int Environment { get; set; }
        public int Social { get; set; }
    }

    public class Wrapper
    {
        public List<Vehicle> Vehicles { get; set; }
    }


    public class Vehicle
    {
        public int id { get; set; }
        public string make { get; set; }
        public string type { get; set; }
        public string variant { get; set; }
        public Fuel fuel { get; set; }
        public int year { get; set; }
        public int envscav { get; set; }
    }

    public class Fuel
    {
        public string id { get; set; }
        public string label { get; set; }
    }

}

